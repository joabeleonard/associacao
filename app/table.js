window.$(document).ready(function() {
const data = require('../database');

let dados;
data.findAll().then((associdos) => {
            dados = associdos;
        }).catch((err) => {
            console.log(err);
            
        })

   var oTable = window.$('#dataTable').DataTable( {
        ajax: {
            url: dados
        },
        columns: [ 
            { data: 'nome' },
            { data: 'nomeDeGuerra' },
            { data: 'CPF' } ,
            { data: 'turma' } ,
            { data: 'posto' } ,
            { data: 'nomeOrgao' },
            { data: 'dataNascimento' },
            { data: 'dataNascimento' },
            { "data": "idEdit", render: function (dataField) { return '<a class="edit" href="">Edit</a>'; } },
            { "data": "idRemove", render: function (dataField) { return '<a class="remove" href="">Remove</a>'; } }
       ]
    } );

 
  var nEditing = null;
 
    window.$('#dataTable').on('click', 'a.edit',function (e) {
        e.preventDefault();
        /* Get the row as a parent of the link that was clicked on */
        var nRow = window.$(this).parents('tr')[0];
 
        if ( nEditing !== null && nEditing != nRow ) {
            /* A different row is being edited - the edit should be cancelled and this row edited */
            restoreRow( oTable, nEditing );
            editRow( oTable, nRow );
            nEditing = nRow;
        }
        else if ( nEditing == nRow && this.innerHTML == "Save" ) {
            /* This row is being edited and should be saved */
            saveRow( oTable, nEditing );
            nEditing = null;
        }
        else {
            /* No row currently being edited */
            editRow( oTable, nRow );
            nEditing = nRow;
        }
    } );
   function editRow ( oTable, nRow )
    {
        var aData = oTable.fnGetData(nRow);
        var jqTds = window.$('>td', nRow);
        jqTds[0].innerHTML = '<input type="text" value="'+aData[0]+'">';
        jqTds[1].innerHTML = '<input type="text" value="'+aData[1]+'">';
        jqTds[2].innerHTML = '<input type="text" value="'+aData[2]+'">';
        jqTds[3].innerHTML = '<input type="text" value="'+aData[3]+'">';
        jqTds[4].innerHTML = '<input type="text" value="'+aData[4]+'">';
        jqTds[5].innerHTML = '[Save]()';
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

    window.$('#dataTable').on('click', 'a.delete',function (e) {
        e.preventDefault();
    
        var nRow = window.$(this).parents('tr')[0];
        oTable.fnDeleteRow( nRow );
    } );
} );

