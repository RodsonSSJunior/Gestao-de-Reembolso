/**
 * Retorna o rótulo do botão exibindo o perfil atual ativo
 * @param {IClientAPI} clientAPI
 */
export default function GetButtonCaption(clientAPI) {
    let role = clientAPI.getAppClientData().UserRole || 'SOLICITANTE';
    return `Perfil: ${role}`;
}