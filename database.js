var nedb = require('nedb');
var associadosDb = new nedb({filename: __dirname + '/tempDB/associados.db', autoload: true});
const jsonfile = require('jsonfile-promised');





 function findAllCallback(callback){
                associadosDb.find({}, function(err, docs) {  
                    console.log(JSON.stringify(docs), err);
                   
                    callback(docs);
                });    

            }

module.exports = {

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
                    console.log(JSON.stringify(docs), err);
                   
                    callback(docs);
                });    

            },
  
    salvaDados(curso, tempoEstudado){
        let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
        if(fs.existsSync(arquivoDoCurso)){
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
        }else{
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(() => {
                    this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
                })
        }
    },
    adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado ){
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }

        jsonfile.writeFile(arquivoDoCurso,dados, {spaces: 2})
                .then(() => {
                    console.log('Tempo salvo com sucesso');
                }).catch((err) => {
                    console.log(err);
                })
    },
    criaArquivoDeCurso(nomeArquivo, conteudoArquivo){
        return jsonfile.writeFile(nomeArquivo,conteudoArquivo)
                .then(() => {
                    console.log('Arquivo Criado')
                }).catch((err) => {
                    console.log(err);
                });
    },
    pegaDados(curso){
        let arquivoDoCurso = __dirname + '/data/'+ curso + '.json';
        return jsonfile.readFile(arquivoDoCurso);
    },
    pegaNomeDosCursos(){
        let arquivos = fs.readdirSync(__dirname + '/data/');
        let cursos = arquivos.map((arquivo) => {
            return arquivo.substr(0, arquivo.lastIndexOf('.'));
        });
        return cursos;
    }
}
