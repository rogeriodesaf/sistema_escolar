const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  creditos: {
    type: Number,
    required: true,
  },
  cargaHoraria: {
    type: Number,
    required: true,
  },
  alunos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

    // outras propriedades da disciplina...
    presencas: {
      type: [
        {
          aluno: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          presente: {
            type: Boolean,
            default: false,
          },
        },
      ],
      default: [],
    },
    aulas: [{
      assunto: {
        type: String,
        required: true,
      },
      data: {
        type: Date,
        required: true,
      },
}],
    materiaisDidaticos: [{
      nome: { type: String },
      descricao: { type: String },
      arquivo: { type: String },
      // Outros campos opcionais do material didático...
    }],
    professores: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Professor',
    }],
  });
  
  
  // outras propriedades da disciplina...


const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
