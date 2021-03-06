var nedb = require('nedb');
var retornoDb = new nedb({filename: __dirname + '/tempDB/retorno.db', autoload: true});
const jsonfile = require('jsonfile-promised');


module.exports = {

      salvar(retorno){
         retornoDb.insert(retorno, function(err, docs) {  

           if(err){
            window.$.dreamAlert({
                'type'      :   'error',
                'message'   :   'Erro, Tente Novamente!'
            });
           } 
           console.log('Uh oh...', err);
     });
    },
    
     pesquisaPorIdAssociado(callback, id){
         retornoDb.find({idAssociado:id}, function(err, docs) {  
            console.log(JSON.stringify(docs), err);
           
            callback(docs);
        });
    }
}
