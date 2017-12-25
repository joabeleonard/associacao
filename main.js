const { app, BrowserWindow, ipcMain}  = require('electron');
const data = require('./data');

app.on('ready', () => {
    console.log('Aplicacão iniciada');
    let mainWindow = new BrowserWindow({
        width: 1700,
        height: 768,
    });

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

});

app.on('window-all-closed', () => {
    app.quit();
});


ipcMain.on('abrir-tela-adicionar', () => {
       let mainWindow = new BrowserWindow({
        width: 1700,
        height: 768,
    });
         
   mainWindow.loadURL(`file://${__dirname}/app/adicionarAssociado.html`);


});

ipcMain.on('abrir-tela-inicial', () => {
       let mainWindow = new BrowserWindow({
        width: 1700,
        height: 768,
    });
         
   mainWindow.loadURL(`file://${__dirname}/app/index.html`);


});

ipcMain.on('fechar-janela-sobre', () => {
    
    sobreWindow.close();
});

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
    console.log(`O curso ${curso} foi estudado por ${tempoEstudado}`);
    data.salvaDados(curso,tempoEstudado);
});