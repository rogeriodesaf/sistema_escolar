const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  matricula: {
    type: String,
    required: true,
    unique: true,
  },
  /* Ao definir o tipo do campo como mongoose.Schema.Types.ObjectId, 
  você está dizendo que o campo será preenchido com o _id de um documento em outra coleção.
   Isso permite estabelecer uma relação entre 
  documentos de diferentes coleções, facilitando o relacionamento entre eles.
  
  No contexto do modelo de Aluno, o campo disciplinas é definido como um array de ObjectId,
   o que significa que ele armazenará
   uma lista de _id de documentos da coleção de Disciplinas em que o aluno está matriculado.
  
Dessa forma, ao adicionar um _id de uma disciplina ao array disciplinas de um aluno, 
você está estabelecendo a associação entre o aluno e a disciplina correspondente. 
Isso permite que você acompanhe 
quais disciplinas um aluno está matriculado de forma eficiente e flexível.

  */
  disciplinas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Disciplina',
    },
  ],
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
