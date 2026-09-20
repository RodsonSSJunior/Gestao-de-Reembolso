namespace gestao.reembolso;
using { managed, cuid } from '@sap/cds/common';

entity Usuarios {
    key email : String(255);
    nome      : String(100);
    role      : String(20) enum { SOLICITANTE; APROVADOR; };
}

/**
 * Mock local de Centro de Custo.
 *
 * Simula o shape de dado que viria do API_COSTCENTER_SRV (S/4HANA Cloud).
 * A camada de serviço (service.cds / cat-service.js) programa contra esta
 * entidade sem saber se o dado é local ou remoto — trocar por uma conexão
 * real via cds.connect.to('API_COSTCENTER_SRV') é mudança de configuração
 * (package.json > cds > requires), não de lógica de negócio.
 */
entity CentrosCusto {
    key codigo      : String(10);
    descricao       : String(100);
    responsavelEmail: String(255);
    ativo           : Boolean default true;
}

entity SolicitacoesReembolso : cuid, managed {
    descricao       : String(100);
    valor           : Decimal(10,2);
    categoria       : String(100);
    status          : String(100) default 'PENDENTE';
    moeda           : String(3) default 'BRL';
    valorConvertido : Decimal(10,2);
    motivoAnalise   : String(255);
    centroCusto     : Association to CentrosCusto;
    anexo           : Composition of one Anexos;
}

/**
 * Media Entity nativa do CAP para upload de comprovantes.
 *
 * @Core.MediaType + @Core.IsMediaType fazem o CAP gerenciar o streaming
 * HTTP automaticamente (parse de multipart, endpoint de download com
 * Content-Type correto) e o Fiori Elements renderiza o widget de upload
 * sem código de UI adicional. O BLOB fica na própria tabela (SQLite local
 * ou HANA Cloud Trial), sem depender do SAP BTP Attachment Service (pago).
 */
entity Anexos : cuid {
    content  : LargeBinary @Core.MediaType : mimeType @Core.IsURL : false;
    mimeType : String @Core.IsMediaType : true;
    filename : String @Core.ContentDisposition.Filename : filename;
}
