
window.$(document).ready(function(){
    window.$("#myBtn").click(function(){
        window.$("#myModal").modal();
     inputName = "";
     inputNomeDeGuerra = "";
     inputEmail = "";
     inputCPF = "";
     inputPosto = "";
     inputOrgao = "";
     inputTurma = "";
     inputDataNascimento = "";
     inputHiddenId = "";
    });

     window.$('#myModal').on('hidden.bs.modal', function() {
    console.log('fechar modal')
    $(this).find('input:text').val('');
    $(this).find('input').val('');
    
  });
});