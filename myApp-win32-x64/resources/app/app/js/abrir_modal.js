
window.$(document).ready(function(){
   

     window.$('#myModal').on('hidden.bs.modal', function() {
        console.log('fechar modal')
        $(this).find('input:text').val('');
        $(this).find('input').val('');
        
     });
});