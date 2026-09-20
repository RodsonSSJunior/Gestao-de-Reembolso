/**
 * Retorna o Header de Autenticação atual para as requisições OData
 * @param {IClientAPI} clientAPI
 */
export default function GetAuthHeader(clientAPI) {
    let clientData = clientAPI.getAppClientData();
    return clientData.AuthHeader || clientAPI.evaluateTargetPath('#Page:Main/#ClientData/AuthHeader') || 'Basic c29saWNpdGFudGU6MTIz';
}