const mongoose = require('mongoose');
const Professor = require('./Professor');
const Disciplina = require('./disciplinaModel');

const associacaoProfessorDisciplinaSchema = new mongoose.Schema({
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina',
    required: true,
  },
  
});

const AssociacaoProfessorDisciplina = mongoose.model('AssociacaoProfessorDisciplina', associacaoProfessorDisciplinaSchema);

module.exports = AssociacaoProfessorDisciplina;
