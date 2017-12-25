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

botaoSalvar.addEventListener('click', function () {
    console.log("hehe");
    let nome = inputName.value;
    let nomeDeGuerra = inputNomeDeGuerra.value;
    let email = inputEmail.value;
    let CPF = inputCPF.value;
    let posto = inputPosto.value;
    let nomeOrgao = inputOrgao.value;
    let turma = inputTurma.value;
    let dataNascimento = inputDataNascimento.value;

    let associado = new Object();
    associado.nome = nome;
    associado.nomeDeGuerra = nomeDeGuerra;
    associado.email = email;
    associado.CPF = CPF;
    associado.posto = posto;
    associado.nomeOrgao = nomeOrgao;
    associado.turma = turma;
    associado.dataNascimento = dataNascimento;
    data.salvaAssociado(associado);
    window.$("#myModal").modal("hide");
    data.findAll();

});