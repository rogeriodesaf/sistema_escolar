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
    materiaisDidaticos: [{
      nome: { type: String },
      descricao: { type: String },
      arquivo: { type: String },
      // Outros campos opcionais do material didático...
    }],
  });
  
  
  // outras propriedades da disciplina...


const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;
