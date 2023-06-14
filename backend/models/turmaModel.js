const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  anoSemestre: {
    type: String,
    required: true,
  },
  alunos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
  }],
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
  },
  // Outros campos específicos da turma
});

const Turma = mongoose.model('Turma', turmaSchema);

module.exports = Turma;
