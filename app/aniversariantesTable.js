
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
            var year = currentDate.getFullYear();

             let aniversariantes = [];
             rest.forEach(element => {

             var dataAniversario = new Date(element.dataNascimento); 
             dataAniversario.setFullYear(year);

            
             var timeDiff = Math.abs(currentDate.getTime() - dataAniversario.getTime());
             var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      
              if(diffDays <= 7
                && diffDays >= 0 && dataAniversario>=currentDate){
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