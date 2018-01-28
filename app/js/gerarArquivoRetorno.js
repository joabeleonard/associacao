var fs = require('fs');

let menuGerarArquivoVariacao = document.querySelector('#menuGerarArquivoVariacao');


menuGerarArquivoVariacao.addEventListener('click', function () {
       
    fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');

        window.$.dreamAlert({
            'type'      :   'success',
            'message'   :   'Operation completed!'
        });
      });
});