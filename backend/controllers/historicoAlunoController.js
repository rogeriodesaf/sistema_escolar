const Aluno = require('../models/Users');
const Disciplina = require('../models/disciplinaModel');
const Nota = require('../models/Nota');

module.exports = class historicoAlunoController  {
  static async obterHistoricoAluno(req, res) {
    try {
      const { alunoId } = req.params;
  
      // Encontre todas as notas do aluno
      const notas = await Nota.find({ aluno: alunoId }).populate('disciplina', 'nome');
  
      // Agrupe as notas por disciplina
      const notasPorDisciplina = {};
      notas.forEach((nota) => {
        const { disciplina, nota: notaValor } = nota;
        if (!notasPorDisciplina[disciplina._id]) {
          notasPorDisciplina[disciplina._id] = {
            disciplina: disciplina.nome,
            notas: [],
            media: 0,
          };
        }
        notasPorDisciplina[disciplina._id].notas.push(notaValor);
      });
  
      // Calcule a média de cada disciplina
      Object.keys(notasPorDisciplina).forEach((disciplinaId) => {
        const disciplina = notasPorDisciplina[disciplinaId];
        const totalNotas = disciplina.notas.length;
        const somaNotas = disciplina.notas.reduce((acumulador, nota) => acumulador + nota, 0);
        disciplina.media = somaNotas / totalNotas;
      });
  
      // Formate o resultado para a resposta
      const historico = Object.values(notasPorDisciplina);
  
      res.json(historico);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao obter histórico do aluno.' });
    }
  }
  
};


