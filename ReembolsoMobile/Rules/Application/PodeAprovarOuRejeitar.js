import IsAprovador from './IsAprovador';

export default function PodeAprovarOuRejeitar(clientAPI) {
    // 1. Verifica se o utilizador tem o papel de Aprovador ativo
    const eAprovador = IsAprovador(clientAPI);
    
    // 2. Verifica se a solicitação atual permite análise
    const registro = clientAPI.getBindingObject();
    const status = registro && registro.status;
    const statusValido = status === 'PENDENTE' || status === 'REQUER_APROVACAO';

    // Retorna true apenas se AMBAS as condições forem satisfeitas
    return eAprovador && statusValido;
}