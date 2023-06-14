const mongoose = require('mongoose');

const historicoAlunoSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Aluno',
    required: true,
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina',
    required: true,
  },
  nota: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Aprovado', 'Reprovado'],
    required: true,
  },
});

const HistoricoAluno = mongoose.model('HistoricoAluno', historicoAlunoSchema);

module.exports = HistoricoAluno;
