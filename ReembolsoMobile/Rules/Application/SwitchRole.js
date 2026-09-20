/**
 * Alterna entre os perfis SOLICITANTE e APROVADOR no MDK
 * @param {IClientAPI} clientAPI
 */
export default function SwitchRole(clientAPI) {
    try {
        let clientData = clientAPI.getAppClientData();
        let currentRole = clientData.UserRole || 'SOLICITANTE';
        let novaRole = currentRole === 'SOLICITANTE' ? 'APROVADOR' : 'SOLICITANTE';

        clientData.UserRole = novaRole;
        clientData.AuthHeader = novaRole === 'APROVADOR'
            ? 'Basic YXByb3ZhZG9yOjEyMw=='
            : 'Basic c29saWNpdGFudGU6MTIz';

        clientAPI.showMessageJS(`Perfil alterado para: ${novaRole}`, 'Troca de Usuário');

        // redraw() não reativa Header/Subhead/ActionBarItem.Caption de forma
        // confiável nessa versão do MDK. Forçamos reload completo da página
        // atual para que o ObjectHeader releia o clientData do zero.
        clientAPI.navigateToPage('/ReembolsoApp/Pages/Main.page', {}, false, true);

    } catch (err) {
        clientAPI.showMessageJS(`Erro no SwitchRole: ${err && err.message}`, 'Debug');
    }
}
