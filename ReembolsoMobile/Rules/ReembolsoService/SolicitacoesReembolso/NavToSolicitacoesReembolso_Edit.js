export default function NavToEdit(clientAPI) {
    if (clientAPI.getODataProvider('/ReembolsoApp/Services/ReembolsoService.service').isDraftEnabled('SolicitacoesReembolso')) {
        return clientAPI.executeAction({
            'Name': '/ReembolsoApp/Actions/DraftEditEntity.action',
            'Properties': {
                'Target': {
                    'EntitySet': 'SolicitacoesReembolso'
                },
                'OnSuccess': '/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.action'
            }
        });
    } else {
        return clientAPI.executeAction('/ReembolsoApp/Actions/ReembolsoService/SolicitacoesReembolso/NavToSolicitacoesReembolso_Edit.action');
    }
}