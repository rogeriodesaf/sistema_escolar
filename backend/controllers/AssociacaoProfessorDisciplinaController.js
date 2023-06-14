const Professor = require('../models/Professor');
const Disciplina = require('../models/disciplinaModel');

module.exports = class AssociacaoProfessorDisciplinaController {
  // Função para associar um professor a uma disciplina
  static async associarProfessorDisciplina(req, res) {
    try {
      const { disciplinaId, professorId } = req.body;
   console.log(req.body)
      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);
  
      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
  
      // Verifique se a propriedade 'professores' é um array
      if (!Array.isArray(disciplina.professores)) {
        disciplina.professores = []; // Inicialize como um array vazio, se necessário
      }
  
      // Adicione o professor à disciplina
      disciplina.professores.push(professorId);
  
      // Salve as alterações no banco de dados
      await disciplina.save();
  
      res.json({ message: 'Professor associado à disciplina com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao associar professor à disciplina' });
    }
  }
  
  // Função para listar as disciplinas associadas a um professor
  static async listarDisciplinasProfessor(req, res) {
    try {
      const { professorId } = req.params;

      // Verifique se o professor existe
      const professor = await Professor.findById(professorId);

      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      // Obtenha as disciplinas associadas ao professor
      const disciplinas = await Disciplina.find({ _id: { $in: professor.disciplinas } });

      res.json(disciplinas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar as disciplinas do professor' });
    }
  }
};
