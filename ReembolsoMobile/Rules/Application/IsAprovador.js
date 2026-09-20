// Controla a visibilidade de botões/telas restritos ao Aprovador
// (ex.: seção "Ações do Aprovador" em SolicitacoesReembolso_Detail.page).
// Depende do Application Client Data ter sido preenchido no startup por
// SetUserRole.action / StoreUserRole.js (plugado em Main.page > OnLoaded).
export default function IsAprovador(clientAPI) {
    const appClientData = clientAPI.getAppClientData();
    return appClientData.UserRole === 'APROVADOR';
}
