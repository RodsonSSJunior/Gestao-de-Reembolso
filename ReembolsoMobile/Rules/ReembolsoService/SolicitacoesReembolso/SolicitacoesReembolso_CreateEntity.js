export default function CreateEntity(clientAPI) {
    // Vamos direto ao ponto para evitar falhas do isDraftEnabled
    return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_CreateEntity.action')
    .then((result) => {
        try {
            // Se falhar aqui, o Catch vai capturar e mostrar na tela
            let newEntity = JSON.parse(result.data);
            let id = newEntity.ID;
            let targetReadLink = `SolicitacoesReembolso(ID=${id},IsActiveEntity=false)`;

            return clientAPI.executeAction({
                'Name': '/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_DraftActivate.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'SolicitacoesReembolso',
                        'ReadLink': targetReadLink
                    }
                }
            });
        } catch (error) {
            // Mostra o erro exato na tela do celular
            return clientAPI.executeAction({
                "Name": "/ReembolsoApp/Actions/GenericMessageBox.action",
                "Properties": {
                    "Message": "Erro no script: " + error.message,
                    "Title": "Falha no JS",
                    "OKCaption": "OK"
                }
            });
        }
    });
}