
const { ipcRenderer } = require('electron');
const data = require('../database');
const dataRetorno = require('../databaseRetorno');



let botaoEscolherMotivoDesligamento = document.querySelector('#btnEscolherMotivoDesligamento');



let botaoSalvar = document.querySelector('#btnSalvarAssosiado');

let inputName = document.querySelector('#exampleInputName');

let inputNomeDeGuerra = document.querySelector('#inputNomeDeGuerra');
let inputNomeDeGuerraDetalhar = document.querySelector('#inputNomeDeGuerraDetalhar');

let inputEmail = document.querySelector('#exampleInputEmail1');

let inputCPF = document.querySelector('#exampleInputCPF');
let inputPosto = document.querySelector('#inputPosto');

let inputOrgao = document.querySelector('#exampleInputOrgao');

let inputTurma = document.querySelector('#exampleInputTurma');
let inputDataNascimento = document.querySelector('#exampleInputDataNascimento');


let inputHiddenId = document.querySelector('#hiddenId');

let inputMatricula = document.querySelector('#exampleInputMatricula');

let inputAssociado = document.querySelector('#inputAssociado');


let inputTelefone = document.querySelector('#exampleInputTelefone');

let inputMotivoDesligamento = document.querySelector('#inputMotivoDesligamento');

var tableRetorno;

inputAssociado.addEventListener('change' , function(){

    if(inputAssociado.value == 'false'){
        window.$("#modalMotivoDesligamento").modal("show");

    }else{
        inputMotivoDesligamento.value = '';
    }
    
});

inputCPF.addEventListener('change',function(){

    let rest;
    function handleResult(docs){
        rest = jQuery.parseJSON(JSON.stringify(docs));
        console.log(rest);
        if(rest.length > 0){

            botaoSalvar.setAttribute('disabled', true);

            window.$.dreamAlert({
                'type'      :   'error',
                'message'   :   'CPF já cadastrado!'
            });
        }
    }

    data.pesquisaPorCpf(handleResult, inputCPF.value);  

    });


 botaoEscolherMotivoDesligamento.addEventListener('click',function(){
    window.$("#modalMotivoDesligamento").modal("hide");
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
    let motivoDesligamento = inputMotivoDesligamento.value;

    let associado = new Object();
    associado.nome = nome.toUpperCase();
    associado.nomeDeGuerra = nomeDeGuerra.toUpperCase();
    associado.email = email;
    associado.CPF = CPF;
    associado.posto = posto;
    associado.nomeOrgao = nomeOrgao;
    associado.turma = turma;
    associado.dataNascimento = dataNascimento;
    associado.matricula = matricula;
    associado.motivoDesligamento =  motivoDesligamento;

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
    
    if(associado._id === undefined || associado._id ===''){
        function handleResult(docs){
            rest = jQuery.parseJSON(JSON.stringify(docs));
            hiddenId.value = rest[0]._id;      
            inputMatricula.value =rest[0].matricula;

            inputAssociado.value = rest[0].flg_associado;
    
            inputTelefone.value = rest[0].telefone;      
        }
    
        data.pesquisaPorCpf(handleResult, associado.CPF);

    }else{
        hiddenId.value = associado._id;
        inputMatricula.value = associado.matricula;

        inputAssociado.value = associado.flg_associado;

        inputTelefone.value = associado.telefone;
    }
    

}

function preencherObjetoDetalhar(associado, updateRow){
   
     function handleResult(docs){
            
        row = updateRow;
        inputNomeDeGuerraDetalhar.value =  associado.nomeDeGuerra;
        
    
        let retornos = {};
         retornos = jQuery.parseJSON(JSON.stringify(docs));
         console.log("Retorno dfs"+ [0]._id);

         tableRetorno = window.$('#dataTableRetorno').DataTable( {
            destroy: true,
            data :  retornos, 
            
            columns: [ 
                { data: "ano" },
                { data: 'mes' },
                { data: 'justificativa' }  ]
        } );
     }

     dataRetorno.pesquisaPorIdAssociado(handleResult, associado._id);


}

