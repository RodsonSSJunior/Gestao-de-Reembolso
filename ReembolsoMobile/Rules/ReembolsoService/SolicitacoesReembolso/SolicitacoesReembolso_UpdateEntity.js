export default function UpdateEntity(clientAPI) {
    if (clientAPI.getODataProvider('/ReembolsoApp/Services/ReembolsoService.service').isDraftEnabled('SolicitacoesReembolso')) {
        return clientAPI.executeAction({
            'Name': '/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.action',
            'Properties': {
                'OnSuccess': ''
            }
        }).then((result) => {
            return clientAPI.executeAction({
                'Name': '/ReembolsoApp/Actions/DraftSaveEntity.action',
                'Properties': {
                    'Target': {
                        'EntitySet': 'SolicitacoesReembolso'
                    }
                }
            });
        });
    } else {
        return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/SolicitacoesReembolso_UpdateEntity.action');
    }
}