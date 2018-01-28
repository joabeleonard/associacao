var fs = require('fs');

let menuGerarArquivoVariacao = document.querySelector('#menuGerarArquivoVariacao');


menuGerarArquivoVariacao.addEventListener('click', function () {
       
    fs.writeFile('arquivoVariacao.txt', 'Arquivo gerado com sucesso!', function (err) {
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
});