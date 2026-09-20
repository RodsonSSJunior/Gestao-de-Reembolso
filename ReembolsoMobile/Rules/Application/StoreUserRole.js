// Fonte: https://help.sap.com/doc/f53c64b93e5140918d676b927a3cd65b/Cloud/en-US/docs-en/guides/getting-started/mdk/development/client-data.html
// clientAPI.getAppClientData() retorna um objeto vivo: atribuir uma
// propriedade nele já persiste o valor para o resto da sessão do app
// (dura até o app ser fechado/removido da lista de recentes).
export default function StoreUserRole(clientAPI) {
    const result = clientAPI.getActionResult('MyProfileResult');
    const role = (result && result.data && result.data.role) || 'SOLICITANTE';

    const appClientData = clientAPI.getAppClientData();
    appClientData.UserRole = role;
}
