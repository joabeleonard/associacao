
var oTable;
window.$(document).ready(function() {
    initialise();
} );


function initialise(){
const data = require('../database');


let rest = {};

  // array.forEach(function(result, index) {
    //  if(day !== new Date(result.dataNascimento).getUTCDate()
      //      || month !== new Date(result.dataNascimento).getMonth) {
        //Remove from array
       // array.splice(index, 1);
      //}    
   // });
 function  handleResult(docs){
            rest = jQuery.parseJSON(JSON.stringify(docs));

            var currentDate = new Date();
            var day = currentDate.getUTCDate();
             var month = currentDate.getMonth()+1;

             let aniversariantes = [];
             rest.forEach(element => {
             
              if(new Date(element.dataNascimento).getUTCDate() === day 
                && new Date(element.dataNascimento).getMonth()+1 === month){
                    aniversariantes.push(element);
                 
              }
             });

             rest= aniversariantes;          
           
    oTable = window.$('#dataTable').DataTable( {
                 
        data :  rest, 
    
        columns: [ 
            { data: "nome" },
            { data: 'nomeDeGuerra' },
            { data: 'CPF' } ,
            { data: 'posto' } ,
            { data: 'nomeOrgao' },
            { data: 'dataNascimento' },
            { data: 'email' },
            { "data": "idDetalhar", render: function (dataField) { return '<a class="detalhar" href="">Detalhar</a>'; } },
       ]
    } );

        }    
        data.findAllCallback(handleResult);
};