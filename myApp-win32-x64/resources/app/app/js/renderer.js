const { ipcRenderer } = require('electron');

let linkAdicionar = document.querySelector('#linkAdicionar');



linkAdicionar.addEventListener('click' , function(){
    console.log("Ok");
    ipcRenderer.send('abrir-tela-adicionar');
});