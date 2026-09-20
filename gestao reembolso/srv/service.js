const cds = require('@sap/cds');
const LOG = cds.log('reembolso');

// Tetos por categoria (mock — em produção viria de uma tabela de configuração).
const LIMITES = { Alimentacao: 200, Geral: 500, Viagem: 300 };

// Taxas de câmbio de contingência: usadas SOMENTE se a API externa falhar
// ou não responder dentro do timeout.
const TAXA_FALLBACK = { EUR: 6.10, USD: 5.60 };

// Tamanho máximo de anexo (3 MB)
const TAMANHO_MAX_ANEXO_BYTES = 3 * 1024 * 1024;

// Status que ainda podem ser aprovados/rejeitados pelo Aprovador.
const STATUS_PENDENTES_DE_DECISAO = ['PENDENTE', 'REQUER_APROVACAO'];

// Cache em memória compartilhado para qualquer moeda (USD, EUR, GBP, etc.)
const cacheCotacoes = {};

module.exports = cds.service.impl(async function () {
    const { SolicitacoesReembolso, Anexos } = this.entities;

    /**
     * Retorna a role do usuário autenticado.
     */
    async function getUserRole(req) {
        if (!req.user || !req.user.id) {
            req.reject(401, 'Usuário não autenticado');
            return;
        }
        const email = req.user.id;
        try {
            const Usuarios = cds.entities('gestao.reembolso').Usuarios;
            const user = await SELECT.one.from(Usuarios).where({ email });
            return user ? user.role : 'SOLICITANTE';
        } catch (err) {
            LOG.error('Falha ao consultar role do usuário', err);
            req.reject(500, 'Não foi possível verificar permissões no momento');
        }
    }

    this.before('READ', SolicitacoesReembolso, async (req) => {
        const role = await getUserRole.call(this, req);
        if (role === undefined) return;
        if (role !== 'APROVADOR') {
            req.query.where({ createdBy: req.user.id });
        }
    });

    this.on('getMyProfile', async (req) => {
        const role = await getUserRole.call(this, req);
        if (role === undefined) return;
        return { email: req.user.id, role };
    });

    this.before('CREATE', SolicitacoesReembolso, async (req) => {
        const r = req.data;

        // --- Validação de entrada ---
        if (typeof r.valor !== 'number' || !isFinite(r.valor) || r.valor <= 0) {
            return req.reject(400, 'Campo "valor" deve ser um número positivo');
        }
        if (!r.descricao || !r.descricao.trim()) {
            return req.reject(400, 'Campo "descricao" é obrigatório');
        }

        const moeda = (r.moeda || 'BRL').toUpperCase();
        let taxa = 1.0;

        if (moeda !== 'BRL') {
            taxa = await buscarTaxaCambio(moeda);
        }

        const valorBRL = (r.valor || 0) * taxa;
        r.valorConvertido = valorBRL;

        // Checagem de duplicidade
        const duplicado = await SELECT.one
            .from(SolicitacoesReembolso, ['ID'])
            .where({ descricao: r.descricao, valor: r.valor, createdBy: req.user.id, status: {'!=': 'REJEITADO'}});

        if (duplicado) {
            r.status = 'SUSPEITO_FRAUDE';
            r.motivoAnalise = 'ALERTA: Solicitação duplicada';
            return;
        }

        const teto = LIMITES[r.categoria] || LIMITES.Geral;
        if (valorBRL > teto) {
            r.status = 'REQUER_APROVACAO';
            r.motivoAnalise = `Valor (R$ ${valorBRL.toFixed(2)}) excede teto (R$ ${teto.toFixed(2)})`;
            return;
        }

        r.status = 'APROVADO_AUTO';
        r.motivoAnalise = 'Aprovado via regras de conformidade';
    });

    this.before('UPDATE', SolicitacoesReembolso, async (req) => {
        const role = await getUserRole.call(this, req);
        if (role === undefined) return;

        const ID = req.data.ID || (req.params[0] && req.params[0].ID) || req.params[0];
        const atual = await SELECT.one.from(SolicitacoesReembolso).where({ ID });
        if (!atual) return req.reject(404, `Solicitação ${ID} não encontrada`);

        // Única forma de UPDATE permitida: o APROVADOR decidindo (aprovar/rejeitar).
        // Edição de campos da solicitação (descrição, valor, etc.) não é uma
        // operação suportada — a solicitação é imutável após criada.
        const statusAlvo = req.data.status;
        const isDecisaoDoAprovador = role === 'APROVADOR' && (statusAlvo === 'APROVADO_MANUAL' || statusAlvo === 'REJEITADO');

        if (!isDecisaoDoAprovador) {
            return req.reject(403, 'Solicitações de reembolso não podem ser editadas após criadas — apenas aprovadas ou rejeitadas pelo Aprovador.');
        }

        if (!STATUS_PENDENTES_DE_DECISAO.includes(atual.status)) {
            return req.reject(409, `Solicitação ${ID} não encontrada ou já processada`);
        }

        // Só deixa passar os campos relevantes a essa decisão.
        Object.keys(req.data).forEach((k) => {
            if (!['ID', 'status', 'motivoAnalise'].includes(k)) delete req.data[k];
        });
    });

    this.before('DELETE', SolicitacoesReembolso, async (req) => {
        const role = await getUserRole.call(this, req);
        if (role === undefined) return;
        if (role === 'APROVADOR') return;

        const ID = (req.params[0] && req.params[0].ID) || req.params[0];
        const atual = await SELECT.one.from(SolicitacoesReembolso).where({ ID });
        if (!atual) return req.reject(404, `Solicitação ${ID} não encontrada`);
        if (atual.createdBy !== req.user.id) {
            return req.reject(403, 'Você só pode excluir solicitações criadas por você');
        }
        if (atual.status !== 'PENDENTE') {
            return req.reject(409, 'Esta solicitação já foi processada e não pode mais ser excluída');
        }
    });

    // Limite de tamanho de anexo
    this.before('CREATE', Anexos, (req) => {
        const content = req.data.content;
        if (content && Buffer.byteLength(content, 'base64') > TAMANHO_MAX_ANEXO_BYTES) {
            return req.reject(413, 'Arquivo excede o limite de 3 MB');
        }
    });
});

/**
 * Busca taxa de câmbio com cache dinâmico em memória, User-Agent e timeout via AbortController.
 */
async function buscarTaxaCambio(moeda) {
    if (!moeda || moeda === 'BRL') return 1.0;

    const agora = Date.now();

    // 1. Reutiliza cotação em cache se tiver menos de 30 minutos (1800000 ms)
    if (cacheCotacoes[moeda] && cacheCotacoes[moeda].expiracao > agora) {
        LOG.info(`[CÂMBIO] Usando cotação em cache para ${moeda}: ${cacheCotacoes[moeda].valor}`);
        return cacheCotacoes[moeda].valor;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    try {
        const res = await fetch(`https://economia.awesomeapi.com.br/last/${moeda}-BRL`, {
            signal: controller.signal,
            headers: {
                // User-Agent evita que a API identifique como bot e retorne HTTP 429
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });

        if (res.status === 429) {
            throw new Error('Rate limit excedido na API de câmbio (HTTP 429)');
        }

        if (!res.ok) throw new Error(`API de câmbio retornou status ${res.status}`);

        const data = await res.json();
        const taxa = parseFloat(data[`${moeda}BRL`]?.bid);

        if (!taxa || !isFinite(taxa)) throw new Error('Resposta da API de câmbio inválida');

        // 2. Salva no cache por 30 minutos
        cacheCotacoes[moeda] = {
            valor: taxa,
            expiracao: agora + 1800000
        };

        LOG.info(`[CÂMBIO] Cotação atualizada via API para ${moeda}: ${taxa}`);
        return taxa;

    } catch (err) {
        LOG.warn(`Falha ao obter câmbio de ${moeda} (${err.message}). Usando fallback.`);

        // Se houver qualquer cache antigo salvo, prefere usar ele antes de ir para o valor fixo
        if (cacheCotacoes[moeda]) return cacheCotacoes[moeda].valor;

        return TAXA_FALLBACK[moeda] || 1.0;
    } finally {
        clearTimeout(timeoutId);
    }
}
