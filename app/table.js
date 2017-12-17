    window.$(document).ready(function() {

 editor = new window.$.fn.dataTable.Editor( {
        ajax: "../data/associados.json",
        table: "#dataTable",
        fields: [ {
                label: "NOME:",
                name: "NOME"
            }, {
                label: "NOME DE GUERRA:",
                name: "NOME DE GUERRA"
            }, {
                label: "CPF:",
                name: "CPF"
            }, {
                label: "TURMA:",
                name: "TURMA",
                type: "select"
            },{
                label: "POSTO:",
                name: "POSTO"
            },{
                label: "ORGÃO:",
                name: "ORGAO"
            },{
                label: "dATA DE NASCIMENTO:",
                name: "DATA NASC."
            },{
                label: "E-MMIL",
                name: "E-MAIL"
            },
        ]
    } );


  window.$('#dataTable').DataTable( {
    ajax: {
        url: '../data/associados.json',
        dataSrc: 'associado'
    },
    columns: [ 
    { data: 'NOME' },
    { data: 'NOME DE GUERRA' },
    { data: 'CPF' } ,
    { data: 'TURMA' } ,
    { data: 'POSTO' } ,
    { data: 'ORGAO' },
    { data: 'DATA NASC.' },
    { data: 'E-MAIL' }  ],
        select: true,
        buttons: [
            { extend: "create", editor: editor },
            { extend: "edit",   editor: editor },
            { extend: "remove", editor: editor }
        ]
} );
} );

