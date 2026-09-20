# 💼 Gestão de Reembolsos — SAP BTP

Sistema corporativo de gestão de solicitações de reembolso, construído sobre a stack completa do **SAP Business Technology Platform**: backend CAP consumindo SAP HANA Cloud, exposto via OData v4 e consumido por um aplicativo móvel nativo em **SAP Mobile Development Kit (MDK)**.

> Projeto de portfólio desenvolvido para processo seletivo de Trainee SAP — cobrindo o ciclo completo da plataforma, do modelo de dados ao app mobile nativo.

---

## 🧭 Arquitetura

```
┌─────────────────────┐      ┌──────────────────────┐      ┌────────────────────┐      ┌──────────────────┐
│   App Móvel (MDK)    │ ───▶ │  SAP Mobile Services   │ ───▶ │  CAP / Node.js (OData v4) │ ───▶ │  SAP HANA Cloud   │
│  iOS / Android        │      │  Destination + Proxy   │      │  Regras de negócio         │      │                    │
└─────────────────────┘      └──────────────────────┘      └────────────────────┘      └──────────────────┘
```

## 🚀 Funcionalidades

- **Solicitante:** cria solicitações de reembolso com valor, categoria, moeda e anexo de comprovante.
- **Motor de aprovação:** aprovação automática dentro do teto por categoria, ou encaminhamento para decisão manual acima do teto.
- **Detecção de duplicidade:** heurística simples de possível fraude (mesma descrição + valor + solicitante).
- **Conversão de câmbio:** integração com API externa, com cache de 30 min, timeout e fallback em caso de indisponibilidade.
- **Aprovador:** revisa e aprova/rejeita solicitações pendentes; visualiza histórico por status (pendentes, aprovadas, rejeitadas).
- **Controle de acesso por papel:** segregação de dados por usuário (Solicitante vê só as próprias; Aprovador vê todas).

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Modelo de dados & serviço | [SAP CAP](https://cap.cloud.sap/) (Node.js) + CDS |
| Banco de dados | SAP HANA Cloud |
| API | OData v4 |
| App mobile | SAP Mobile Development Kit (MDK) |
| Conectividade mobile | SAP Mobile Services |
| Deploy | Multi-Target Application (MTA) — Cloud Foundry, SAP BTP |

## 📁 Estrutura do repositório

```
.
├── backend/            # Projeto CAP (Node.js + HANA Cloud)
│   ├── db/              # Modelo de domínio (CDS) e dados de seed
│   ├── srv/              # Serviço OData e regras de negócio
│   ├── xs-security.json  # Modelo de segurança XSUAA (scopes, roles, role-collections)
│   └── mta.yaml           # Descritor de deploy
│
└── mobile/              # Projeto SAP MDK
    ├── Pages/             # Telas do app
    ├── Actions/            # Fluxos de navegação e chamadas ao serviço
    └── Rules/               # Regras JS (autorização visual, formatação)
```

## 🔐 Sobre a autenticação nesta versão

Esta versão usa **autenticação simplificada** (Basic Auth com usuário técnico fixo no Destination) para fins de demonstração. O modelo de segurança **XSUAA completo já está especificado** em `backend/xs-security.json` (scopes, role-templates e role-collections), com o caminho de reativação documentado — decisão de escopo consciente, não limitação técnica.

## ▶️ Rodando o backend localmente

```bash
cd backend
npm install
cds watch
```

Usuários de teste disponíveis (auth mockada): `solicitante:123` e `aprovador:123`.

## 📱 App mobile

O projeto MDK em `/mobile` é importado e executado via **SAP Mobile Services** + **SAP Business Application Studio** (ou MDK Client). Não roda de forma independente — depende do backend estar publicado e de uma Destination configurada apontando para ele.

## 📌 Roadmap

- [ ] Reativação do XSUAA/OAuth2 com identidade de usuário final ponta a ponta
- [ ] Suíte de testes automatizados
- [ ] Extrair tetos de aprovação por categoria para entidade de configuração administrável

---

<sub>Desenvolvido como projeto de portfólio — SAP CAP · SAP HANA Cloud · SAP MDK · SAP BTP</sub>
