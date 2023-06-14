const mongoose = require('mongoose');

const coordenadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sobrenome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'coordenador',
    enum: ['coordenador'],
    required: true,
  },
});

const Coordenador = mongoose.model('Coordenador', coordenadorSchema);

module.exports = Coordenador;
