var app = require('electron').remote; 
var dialog = app.dialog;
var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

let botaoSalvar = document.querySelector('#btnSalvarArquivo');

let file = document.querySelector('#fileupload');


function openFile () {

    dialog.showOpenDialog({ filters: [
        { name: 'text', extensions: ['txt'] }
       ]},function (fileNames) {
        if (fileNames === undefined) return;

        var fileName = fileNames[0];

        fs.readFile(fileName, 'utf-8', function (err, data) {
             console.log(data);
        });

        window.$.dreamAlert({
            'type'      :   'success',
            'message'   :   'Operação Realizada com Sucesso!'
        });

    }); 
}

