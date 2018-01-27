
var oTable;
window.$(document).ready(function() {
    initialise();
} );

function addRow(associado){
    oTable.row.add(associado).draw();
}

function editRow(row, associado){
    console.log(associado);
      oTable
        .row(row)
        .remove()
        .draw();
oTable.row.add(jQuery.parseJSON(associado)).draw();
}

function initialise(){
const data = require('../database');


let rest = {};
 function  handleResult(docs){
            rest = jQuery.parseJSON(JSON.stringify(docs));
  
           
             oTable = window.$('#dataTable').DataTable( {
                 
        data :  rest, 
     

        columns: [ 
            { data: "nome" },
            { data: 'nomeDeGuerra' },
            { data: 'CPF' } ,
            { data: 'posto' } ,
            { data: 'nomeOrgao' },
            { "data": "idEdit", render: function (dataField) { return '<a class="edit" href="">Editar</a>'; } },
            { "data": "idDetalhar", render: function (dataField) { return '<a class="detalhar" href="">Detalhar</a>'; } }
       ]
    } );


    var nEditing = null;
 
    window.$('#dataTable').on('click', 'a.edit',function (e) {
        e.preventDefault();
        /* Get the row as a parent of the link that was clicked on */
        var nRow = window.$(this).parents('tr')[0];

        var aData = oTable.row(nRow).data();
        preencherObjeto(aData, nRow);

        window.$("#myModal").modal("show");

    } );

    window.$('#dataTable').on('click', 'a.detalhar',function (e) {
        e.preventDefault();
        /* Get the row as a parent of the link that was clicked on */
        var nRow = window.$(this).parents('tr')[0];

        var aData = oTable.row(nRow).data();
        preencherObjeto(aData, nRow);

        window.$("#myModalDetalhe").modal("show");


    } );

   function editRow ( oTable, nRow )
    {
        var aData = oTable.row(nRow).data();
        var jqTds = window.$('>td', nRow);
        jqTds[0].innerHTML = '<input type="text" value="'+aData[0]+'">';
        jqTds[1].innerHTML = '<input type="text" value="'+aData[1]+'">';
        jqTds[2].innerHTML = '<input type="text" value="'+aData[2]+'">';
        jqTds[3].innerHTML = '<input type="text" value="'+aData[3]+'">';
        jqTds[4].innerHTML = '<input type="text" value="'+aData[4]+'">';
        jqTds[5].innerHTML = '<input type="text" value="'+aData[5]+'">';
        jqTds[6].innerHTML = '<input type="text" value="'+aData[6]+'">';
        jqTds[7].innerHTML = '<input type="text" value="'+aData[7]+'">';
        jqTds[8].innerHTML = '[Save]()';
        
    }

    function restoreRow ( oTable, nRow )
    {
        var aData = oTable.fnGetData(nRow);
        var jqTds = $('>td', nRow);
        
        for ( var i=0, iLen=jqTds.length ; i<iLen ; i++ ) {
            oTable.fnUpdate( aData[i], nRow, i, false );
        }
        
        oTable.fnDraw();
    }

    function saveRow ( oTable, nRow )
    {
        var jqInputs = window.$('input', nRow);
        oTable.fnUpdate( jqInputs[0].value, nRow, 0, false );
        oTable.fnUpdate( jqInputs[1].value, nRow, 1, false );
        oTable.fnUpdate( jqInputs[2].value, nRow, 2, false );
        oTable.fnUpdate( jqInputs[3].value, nRow, 3, false );
        oTable.fnUpdate( jqInputs[4].value, nRow, 4, false );
        oTable.fnUpdate( '[Edit]()', nRow, 5, false );
        oTable.fnDraw();
    }

    window.$('#new').click( function (e) {
    e.preventDefault();
 
    var aiNew = oTable.add( [ '', '', '', '', '','','','',
        '[Edit]()', '[Delete]()' ] );
    var nRow = oTable.fnGetNodes( aiNew[0] );
    editRow( oTable, nRow );
    nEditing = nRow;
    } );

    window.$('#dataTable').on('click', 'a.remove',function (e) {
        e.preventDefault();
        var nRow = window.$(this).parents('tr')[0];
        var aData = oTable.row(nRow).data();

        data.removerAssociado(aData);
         oTable
        .row( nRow )
        .remove()
        .draw();

    } );
        }    
        data.findAllCallback(handleResult);
};