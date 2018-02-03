var fs = require('fs');
const {dialog} = require("electron").remote;


let menuGerarArquivoVariacao = document.querySelector('#menuGerarArquivoVariacao');


menuGerarArquivoVariacao.addEventListener('click', function () {
    
    var currentDate = new Date();
    var month = currentDate.getMonth()+1;
    var year = currentDate.getFullYear();

    function handleResult(docs){
        rest = jQuery.parseJSON(JSON.stringify(docs));

        let line ='';
        console.log(rest);
        rest.forEach(element => {
            console.log(element);
            let tamanhoNome = element.nome;
            let tipoAlteracao = 'I';
            if(element.flg_associado ==='false'){
                tipoAlteracao = 'E';
            }

            let nome = String("00000000000000000000000000000000000000000000000000000000000000000").concat(element.nome);
            console.log(nome);
            line = line.concat('006312ASSOF               '+nome.substr(nome.length-65,65)+element.CPF
            +element.codOrgao+element.matricula+tipoAlteracao+'60000000000000000000000000000000\n');
        });

        var savePath = dialog.showSaveDialog({defaultPath: month+"-"+year+'-arquivoVariacao.txt'});

        fs.writeFile(savePath, line, function (err) {
            if (err) {
                window.$.dreamAlert({
                    'type'      :   'error',
                    'message'   :   'Erro, Por favor tente novamente!'
                });
                throw err;
            }
            console.log('Saved!');
    
            window.$.dreamAlert({
                'type'      :   'success',
                'message'   :   'Arquivo gerado com sucesso!'
            });
          });
    }

    data.findToArquivoRetorno(handleResult);

    
});