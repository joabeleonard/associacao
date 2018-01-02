
const { ipcRenderer } = require('electron');
const data = require('../database');

let botaoSalvar = document.querySelector('#btnSalvarAssosiado');

let inputName = document.querySelector('#exampleInputName');
let inputNomeDeGuerra = document.querySelector('#inputNomeDeGuerra');
let inputEmail = document.querySelector('#exampleInputEmail1');
let inputCPF = document.querySelector('#exampleInputCPF');
let inputPosto = document.querySelector('#inputPosto');
let inputOrgao = document.querySelector('#exampleInputOrgao');
let inputTurma = document.querySelector('#exampleInputTurma');
let inputDataNascimento = document.querySelector('#exampleInputDataNascimento');
let inputHiddenId = document.querySelector('#hiddenId');

botaoSalvar.addEventListener('click', function () {
    let nome = inputName.value;
    let nomeDeGuerra = inputNomeDeGuerra.value;
    let email = inputEmail.value;
    let CPF = inputCPF.value;
    let posto = inputPosto.value;
    let nomeOrgao = inputOrgao.value;
    let turma = inputTurma.value;
    let dataNascimento = inputDataNascimento.value;
    let hiddenId = inputHiddenId.value;

    let associado = new Object();
    associado.nome = nome;
    associado.nomeDeGuerra = nomeDeGuerra;
    associado.email = email;
    associado.CPF = CPF;
    associado.posto = posto;
    associado.nomeOrgao = nomeOrgao;
    associado.turma = turma;
    associado.dataNascimento = dataNascimento;
    associado._id = hiddenId;

    if(hiddenId != null && hiddenId != undefined && hiddenId != ""){
         data.editarAssociado(associado);
    }else{
         data.salvaAssociado(associado);
         addRow(associado);
    }
   
    window.$("#myModal").modal("hide");
    

});

function preencherObjeto(associado){
    inputName.value = associado.nome;
    inputNomeDeGuerra.value = associado.nomeDeGuerra;
    inputEmail.value = associado.email;
    inputCPF.value = associado.CPF;
    inputPosto.value = associado.posto;
    inputOrgao.value= associado.nomeOrgao;
    inputTurma.value= associado.turma;
    inputDataNascimento.value= associado.dataNascimento;
    hiddenId.value = associado._id;
    window.$("#myModal").modal("show");

}

