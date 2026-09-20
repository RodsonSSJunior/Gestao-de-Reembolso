using {gestao.reembolso as db} from '../db/schema';

@path: '/service/ReembolsoService'
service ReembolsoService {

    entity SolicitacoesReembolso as projection on db.SolicitacoesReembolso;

    // Somente leitura: centro de custo é referência, não é criado pelo usuário final.
    @readonly
    entity CentrosCusto          as projection on db.CentrosCusto;

    // Exposto separadamente para permitir upload/download de anexo via
    // endpoint de Media Entity padrão do CAP (/Anexos(ID)/content).
    entity Anexos                as projection on db.Anexos;

    function getMyProfile()                              returns {
        email : String;
        role  : String;
    };
}

annotate ReembolsoService.SolicitacoesReembolso with {
    valorConvertido @readonly;
};

annotate ReembolsoService.SolicitacoesReembolso with @(
    UI.LineItem            : [
        {
            $Type: 'UI.DataField',
            Value: descricao,
            Label: 'Descrição'
        },
        {
            $Type: 'UI.DataField',
            Value: valor,
            Label: 'Valor Original'
        },
        {
            $Type: 'UI.DataField',
            Value: moeda,
            Label: 'Moeda'
        },
        {
            $Type: 'UI.DataField',
            Value: valorConvertido,
            Label: 'Valor Convertido'
        },
        {
            $Type: 'UI.DataField',
            Value: categoria,
            Label: 'Categoria'
        },
        {
            $Type: 'UI.DataField',
            Value: centroCusto_codigo,
            Label: 'Centro de Custo'
        },
        {
            $Type: 'UI.DataField',
            Value: status,
            Label: 'Status'
        },
        {
            $Type: 'UI.DataField',
            Value: motivoAnalise,
            Label: 'Motivo'
        }

    ],
    UI.FieldGroup #Detalhes: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: descricao
            },
            {
                $Type: 'UI.DataField',
                Value: valor
            },
            {
                $Type: 'UI.DataField',
                Value: categoria
            },
            {
                $Type: 'UI.DataField',
                Value: moeda
            },
            {
                $Type: 'UI.DataField',
                Value: valorConvertido
            },
            {
                $Type: 'UI.DataField',
                Value: centroCusto_codigo
            },
            {
                $Type: 'UI.DataField',
                Value: status
            },
            {
                $Type: 'UI.DataField',
                Value: motivoAnalise
            }
        ]
    },
    UI.Facets              : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'SecaoDetalhes',
        Label : 'Detalhes',
        Target: '@UI.FieldGroup#Detalhes'
    }]
);
