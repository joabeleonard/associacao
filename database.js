var nedb = require('nedb');
var associadosDb = new nedb({filename: __dirname + '/tempDB/associados.db', autoload: true});
const jsonfile = require('jsonfile-promised');

 function findAllCallback(callback){
                associadosDb.find({}, function(err, docs) {  
                    //console.log(JSON.stringify(docs), err);
                   
                    callback(docs);
                });    

            }

            
 function findByIdCallback(id, callback){
                associadosDb.findOne({ _id: id }, function(err, docs) {  
                    console.log(JSON.stringify(docs), err);
                   
                    callback(docs);
                });    

            }
module.exports = {

     editarAssociado(associado, callback){
         associadosDb.update({_id:associado._id}, associado, {}, function(err, numReplaced) {  

            findByIdCallback(associado._id,callbackFindOne);

            function callbackFindOne(resposta) {
                  callback(JSON.stringify(resposta));
             }
           console.log("Update", err);
           
     });
    },
    salvaAssociado(associado){
          console.log(associado);
         associadosDb.insert(associado, function(err, docs) {  
           console.log('Uh oh...', err);
     });
    },

     removerAssociado(associado){
          console.log(associado);
      associadosDb.remove({ _id: associado._id }, {}, function (err) {
         if(err)return console.log(err);

         console.log("Usuário removido");
        });
    },

    
   findAllCallback(callback){
                associadosDb.find({}, function(err, docs) {  
                    //console.log(JSON.stringify(docs), err);
                   
                    callback(docs);
                });    

            },

    findAniversaviantesCallback(callback){

        var currentDate = new Date();
        var day = currentDate.getDay();
        var month = currentDate.getMonth()+1;

                associadosDb.find({dataNascimento:day, dataNascimento:month}, function(err, docs) {  
                    console.log(JSON.stringify(docs), err);
                   
                    callback(docs);
                });    
            
            },
    pesquisaPorCpf(callback, cpf){
        associadosDb.find({CPF:cpf+""}, function(err, docs) {  
            console.log(JSON.stringify(docs), err);
           
            callback(docs);
        });
    }
}
