const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  name: String,
  sobrenome: String,
  email: String,
  password:String,
  role: {
    type: String,
    default: 'professor',
    enum: ['professor'],
    required: true
  },
  disciplinas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina'
  }],
  // Outros campos específicos do professor
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
