const mongoose = require('mongoose');

const notaSchema = new mongoose.Schema({
  aluno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Altere 'Aluno' para 'Users'
    required: true
  },
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina',
    required: true
  },
  nota: {
    type: Number,
    required: true
  }
,  
  
    status: {
      type: String,
      enum: ['Aprovado', 'Reprovado'],
      
    },
  });
  





const Nota = mongoose.model('Nota', notaSchema);

module.exports = Nota;
