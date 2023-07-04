const mongoose = require('mongoose');

const registroAulaSchema = new mongoose.Schema({
  disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina' },
  data: { type: Date, required: true },
  alunosPresentes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Aluno' }],
  conteudoAbordado: { type: String, required: true },
  // Outros campos relevantes para o registro da aula
});

const RegistroAula = mongoose.model('RegistroAula', registroAulaSchema);

module.exports = RegistroAula;
