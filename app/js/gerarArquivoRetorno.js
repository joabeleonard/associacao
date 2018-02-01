var fs = require('fs');

let menuGerarArquivoVariacao = document.querySelector('#menuGerarArquivoVariacao');


menuGerarArquivoVariacao.addEventListener('click', function () {
    
    var currentDate = new Date();
    var month = currentDate.getMonth()+1;
    var year = currentDate.getFullYear();

    function handleResult(docs){
        rest = jQuery.parseJSON(JSON.stringify(docs));

        let line ='';
        rest.forEach(element => {
            console.log(element);
            line = line.concat('006312ASSOF               000000000000000000000000000000000000000000000DANILOBARBOSADASILVA'+element.CPF
            +element.codOrgao+element.matricula+'I60000000000000000000000000000000\n');
        });
        fs.writeFile(month+"-"+year+'-arquivoVariacao.txt', line, function (err) {
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