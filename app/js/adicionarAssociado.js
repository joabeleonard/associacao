
const { ipcRenderer } = require('electron');
const data = require('../database');



let botaoSalvar = document.querySelector('#btnSalvarAssosiado');

let inputName = document.querySelector('#exampleInputName');
let inputNameDetalhar = document.querySelector('#exampleInputNameDetalhar');

let inputNomeDeGuerra = document.querySelector('#inputNomeDeGuerra');
let inputNomeDeGuerraDetalhar = document.querySelector('#inputNomeDeGuerraDetalhar');

let inputEmail = document.querySelector('#exampleInputEmail1');
let inputEmailDetalhar = document.querySelector('#inputEmailDetalhar');

let inputCPF = document.querySelector('#exampleInputCPF');
let inputPosto = document.querySelector('#inputPosto');
let inputOrgao = document.querySelector('#exampleInputOrgao');
let inputTurma = document.querySelector('#exampleInputTurma');
let inputDataNascimento = document.querySelector('#exampleInputDataNascimento');
let inputDataNascimentoDetalhe = document.querySelector('#exampleInputDataNascimentoDetalhar');


let inputHiddenId = document.querySelector('#hiddenId');
let inputMatricula = document.querySelector('#exampleInputMatricula');
let inputAssociado = document.querySelector('#inputAssociado');
let inputTelefone = document.querySelector('#exampleInputTelefone');


inputCPF.addEventListener('keypress',function(){

    let rest = {};
    function handleResult(docs){
        rest = jQuery.parseJSON(JSON.stringify(docs));
    }

    data.pesquisaPorCpf(handleResult, inputCPF.value);

    if(rest === null){
        botaoSalvar.setAttribute('disabled', false);
    }else{

    }

    });

let row;

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
    let matricula = inputMatricula.value;
    let flagAssociado = inputAssociado.value;
    let telefone = inputTelefone.value;

    let associado = new Object();
    associado.nome = nome;
    associado.nomeDeGuerra = nomeDeGuerra;
    associado.email = email;
    associado.CPF = CPF;
    associado.posto = posto;
    associado.nomeOrgao = nomeOrgao;
    associado.turma = turma;
    associado.dataNascimento = dataNascimento;
    associado.matricula = matricula;
    associado.flg_associado = flagAssociado;
    associado.telefone = telefone;

    if(hiddenId != null && hiddenId != undefined && hiddenId != ""){
         associado._id = hiddenId;
         associado.dataUltimaEdicao = new Date();
         data.editarAssociado(associado, atualizarRow);

          function atualizarRow(resposta) {
            editRow(row, resposta);
        }
    }else{
        associado.dataCriacao = new Date();
         data.salvaAssociado(associado);
         addRow(associado);
    }
   
    window.$("#myModal").modal("hide");
    

});


function preencherObjeto(associado, updateRow){
    row = updateRow;
    inputName.value = associado.nome;
    inputNameDetalhar.value = associado.nome;
    inputNomeDeGuerra.value = associado.nomeDeGuerra;
    inputNomeDeGuerraDetalhar.value =  associado.nomeDeGuerra;
    inputEmail.value = associado.email;
    inputEmailDetalhar.value = associado.email;
    inputCPF.value = associado.CPF;
    inputPosto.value = associado.posto;
    inputOrgao.value= associado.nomeOrgao;
    inputTurma.value= associado.turma;
    inputDataNascimento.value= associado.dataNascimento;
    inputDataNascimentoDetalhe.value = associado.dataNascimento;    
    hiddenId.value = associado._id;
    inputMatricula.value = associado.matricula;
    inputAssociado.value = associado.flg_associado;
    inputTelefone.value = associado.telefone;

}

