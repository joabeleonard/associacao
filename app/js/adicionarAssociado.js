
const { ipcRenderer } = require('electron');
const data = require('../database');
const dataRetorno = require('../databaseRetorno');




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
let inputOrgaoDetalhar = document.querySelector('#inputOrgaoDetalhar');

let inputTurma = document.querySelector('#exampleInputTurma');
let inputDataNascimento = document.querySelector('#exampleInputDataNascimento');
let inputDataNascimentoDetalhe = document.querySelector('#exampleInputDataNascimentoDetalhar');


let inputHiddenId = document.querySelector('#hiddenId');

let inputMatricula = document.querySelector('#exampleInputMatricula');
let inputmatriculaDetalhar = document.querySelector('#inputmatriculaDetalhar');

let inputAssociado = document.querySelector('#inputAssociado');
let inputAssociadoDetalhar = document.querySelector('#inputAssociadoDetalhar');


let inputTelefone = document.querySelector('#exampleInputTelefone');

let retornos = {};
var tableRetorno;


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

    if(associado.nomeOrgao ==='PMCE'){
        associado.codOrgao = 371;
    }

    if(associado.nomeOrgao ==='CBMCE'){
        associado.codOrgao = 381;
    }

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
   
    window.$.dreamAlert({
        'type'      :   'success',
        'message'   :   'Operação Realizada com Sucesso!'
    });
    window.$("#myModal").modal("hide");
    

});


function preencherObjeto(associado, updateRow){
    row = updateRow;
    inputName.value = associado.nome;
    inputNomeDeGuerra.value = associado.nomeDeGuerra;
    inputEmail.value = associado.email;
    inputCPF.value = associado.CPF;
    inputPosto.value = associado.posto;
    inputOrgao.value= associado.nomeOrgao;

    inputTurma.value= associado.turma;
    inputDataNascimento.value= associado.dataNascimento;
    hiddenId.value = associado._id;
    inputMatricula.value = associado.matricula;

    inputAssociado.value = associado.flg_associado;

    inputTelefone.value = associado.telefone;

}

function preencherObjetoDetalhar(associado, updateRow){
    row = updateRow;
    inputNameDetalhar.value = associado.nome;
    inputNomeDeGuerraDetalhar.value =  associado.nomeDeGuerra;
    inputEmailDetalhar.value = associado.email;
    inputOrgaoDetalhar.value= associado.nomeOrgao;
   
    inputDataNascimentoDetalhe.value = associado.dataNascimento;    
 
    inputmatriculaDetalhar.value = associado.matricula;

    inputAssociadoDetalhar.value = associado.flg_associado;


     function handleResult(docs){
            
         retornos = jQuery.parseJSON(JSON.stringify(docs));
         console.log("Retorno dfs"+retornos[0]._id);

         tableRetorno = window.$('#dataTableRetorno').DataTable( {
                 
            data :  retornos, 
            
            columns: [ 
                { data: "ano" },
                { data: 'mes' },
                { data: 'justificativa' }  ]
        } );
     }

     dataRetorno.pesquisaPorIdAssociado(handleResult, associado._id);


}

