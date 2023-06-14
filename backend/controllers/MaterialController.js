const Disciplina = require('../models/disciplinaModel');
const mongoose = require('mongoose');

module.exports = class MaterialController {
    static async criarMaterial(req, res) {
        try {
          const { disciplinaId } = req.params;
          const { nome, descricao, arquivo } = req.body;
      
          if (!mongoose.isValidObjectId(disciplinaId)) {
            return res.status(400).json({ message: 'ID da disciplina inválido.' });
          }
      
          const disciplina = await Disciplina.findById(disciplinaId);
          if (!disciplina) {
            return res.status(404).json({ message: 'Disciplina não encontrada.' });
          }
      
          disciplina.materiaisDidaticos.push({ nome, descricao, arquivo });
          await disciplina.save();
      
          res.status(201).json({ message: 'Material didático criado com sucesso.' });
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Erro ao criar material didático.' });
        }
      }

  static async obterMateriaisDisciplina(req, res) {
    try {
      const { disciplinaId } = req.params;

      const disciplina = await Disciplina.findById(disciplinaId);
      if (!disciplina) {
        return res.status(404).json({ message: 'Disciplina não encontrada.' });
      }

      const materiaisDidaticos = disciplina.materiaisDidaticos;

      res.json(materiaisDidaticos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao obter materiais didáticos.' });
    }
  }

  // Outros métodos relacionados aos materiais didáticos...
};
