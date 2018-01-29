var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const data = require('../database');


let botaoSalvar = document.querySelector('#btnSalvarArquivo');

let file = document.querySelector('#fileupload');


function openFile () {

    dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['txt'] }
       ]},function (fileNames) {
        if (fileNames === undefined) return;

        var fileName = fileNames[0];

            fs.readFile(fileName, 'utf-8', function (err, data) {
              
                let ano = data.substr(0,4);
                let mes = data.substr(4,2);
                let orgao = data.substr(6,3);
                let matricula = data.substr(9,8);
                let justificativa = data.substr(110,2);

                console.log("Ano: "+ano +"Mes: " +mes + "Matricula: "+ matricula + "Orgao: " + orgao), "justificativa: " + justificativa;
                fs.writeFile('arquivosRetorno/arquivoVariacao.txt', data, function (err) {
                    if (err) {
                        window.$.dreamAlert({
                            'type'      :   'error',
                            'message'   :   'Erro, Por favor tente novamente!'
                        });
                        throw err;
                     }
                     console.log('Saved!');

                  });

                  let rest = {};
                  function handleResult(docs){
                      rest = jQuery.parseJSON(JSON.stringify(docs));
                   }

                   data.pesquisaPorMAtriculaOrgao(handleResult, matricula, orgao);

                  window.$.dreamAlert({
                      'type'      :   'success',
                      'message'   :   'Operação Realizada com Sucesso!'
                  });
            });

       

    }); 
}

