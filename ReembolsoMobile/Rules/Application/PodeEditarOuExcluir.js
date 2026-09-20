// Mantém a UI coerente com as regras já aplicadas no backend
// (service.js: before UPDATE/DELETE). Isso NÃO substitui a checagem do
// servidor — é só para não mostrar um botão que o backend vai rejeitar.
export default function PodeEditarOuExcluir(clientAPI) {
    const appClientData = clientAPI.getAppClientData();
    if (appClientData.UserRole === 'APROVADOR') return true;

    const registro = clientAPI.getBindingObject();
    return registro && registro.status === 'PENDENTE';
}
