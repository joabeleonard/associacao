var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
const dataRetorno = require('../databaseRetorno');
const data = require('../database');



let botaoSalvar = document.querySelector('#btnSalvarArquivo');

let file = document.querySelector('#fileupload');


function openFile () {

    dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['txt'] }
       ]},function (fileNames) {
        if (fileNames === undefined) return;

        var fileName = fileNames[0];

            fs.readFile(fileName, 'utf-8', function (err, conteudo) {
              

                var lines = conteudo.split('\n');

                for(var i = 0;i < lines.length;i++){

                    let ano = lines[i].substr(0,4);
                    let mes = lines[i].substr(4,2);
                    let orgao = lines[i].substr(6,3);
                    let matricula = lines[i].substr(9,8);
                    let justificativa = lines[i].substr(110,2);

                    console.log("Ano: "+ano +"Mes: " +mes + "Matricula: "+ matricula + "Orgao: " + orgao), "justificativa: " + justificativa;
                    fs.writeFile('arquivosRetorno/arquivoVariacao.txt', conteudo, function (err) {
                        if (err) {
                            window.$.dreamAlert({
                                'type'      :   'error',
                                'message'   :   'Erro, Por favor tente novamente!'
                            });
                            throw err;
                        }

                    });

                    let rest = {};
                    let retorno = {};
                    function handleResult(docs){
                        rest = jQuery.parseJSON(JSON.stringify(docs));

                        if(rest !== null && rest._id !== null){
                              retorno.idAssociado = rest._id;
                              retorno.ano = ano;
                              retorno.mes = mes;
                              retorno.justificativa = justificativa;
                              dataRetorno.salvar(retorno);
                        }
                      
                    }

                    data.pesquisaPorMatriculaOrgao(handleResult, matricula, orgao);
                }    

                  window.$.dreamAlert({
                      'type'      :   'success',
                      'message'   :   'Operação Realizada com Sucesso!'
                  });
            });

       

    }); 
}

