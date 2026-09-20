export default function Cancel(clientAPI) {
    if (clientAPI.getODataProvider('/ReembolsoApp/Services/ReembolsoService.service').isDraftEnabled('SolicitacoesReembolso')) {
        return clientAPI.executeAction({
            'Name': '/ReembolsoApp/Actions/DraftDiscardEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'SolicitacoesReembolso'
                },
                'OnSuccess': '/ReembolsoApp/Actions/CloseModalPage_Cancel.action'
            }
        });
    } else {
        return clientAPI.executeAction('/ReembolsoApp/Actions/CloseModalPage_Cancel.action');
    }
}