# Gestão de Reembolsos — SAP BTP (CAP + HANA Cloud + MDK)

Sistema corporativo de gestão de solicitações de reembolso, com workflow de
aprovação automática/manual por teto de categoria, controle de acesso por
papéis (Solicitante/Aprovador) e app móvel nativo em SAP Mobile Development
Kit (MDK).

## Stack

- **Backend:** SAP CAP (Node.js) + SAP HANA Cloud
- **API:** OData v4
- **Mobile:** SAP Mobile Development Kit (MDK), via SAP Mobile Services
- **Deploy:** Multi-Target Application (MTA) em Cloud Foundry — SAP BTP Trial

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `db/` | Modelo de domínio (CDS) e dados de seed |
| `srv/` | Serviço OData (`service.cds`) e regras de negócio (`service.js`) |
| `xs-security.json` | Modelo de segurança XSUAA (scopes, roles, role-collections) |
| `mta.yaml` | Descritor de deploy |

## Regras de negócio principais

- Criação de solicitação: validação de entrada, checagem de duplicidade
  (heurística de fraude), aprovação automática dentro do teto por categoria,
  ou marcação `REQUER_APROVACAO` acima do teto.
- Conversão de câmbio para moeda estrangeira com cache (30 min), timeout e
  fallback estático em caso de falha da API externa.
- Aprovação/rejeição: exclusiva ao papel `APROVADOR`, feita via `PATCH` na
  própria entidade (`status`), com transição de estado validada no backend.

## Autenticação — nota importante sobre a v1.0

Esta versão usa autenticação simplificada para fins de demonstração:

- `cds.requires.auth.kind = "mocked"` no backend.
- O Destination do SAP Mobile Services usa **Basic Authentication com
  usuário técnico fixo**, em vez de repassar a identidade de cada usuário
  final.

O modelo de segurança **XSUAA completo já está especificado** em
`xs-security.json` (scopes, role-templates e role-collections coerentes com
os papéis `SOLICITANTE`/`APROVADOR` usados no restante do sistema), mas não
está ativado nesta versão — decisão de escopo para acelerar a entrega da
v1.0, não limitação técnica.

**Caminho de reativação:**
1. Descomentar o resource `gestao-reembolso-auth` e sua dependência no
   módulo `srv` do `mta.yaml`.
2. Trocar `cds.requires.auth.kind` para `xsuaa` no perfil `[production]`.
3. Vincular a mesma instância XSUAA no SAP Mobile Services (Segurança →
   Serviço XSUAA).
4. Reonboardar o app móvel para adotar o fluxo OAuth2 nativo do Mobile
   Services.

## Rodando localmente

```
npm install
cds watch
```

Usuários mockados disponíveis: `solicitante:123` e `aprovador:123`.
