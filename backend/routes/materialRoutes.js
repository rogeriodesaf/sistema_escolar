const express = require('express');
const router = express.Router();

const MaterialController = require('../controllers/MaterialController');

// Rota para adicionar um novo material didático a uma disciplina
router.post('/disciplinas/:disciplinaId/materiais', MaterialController.criarMaterial);

// Rota para obter todos os materiais didáticos de uma disciplina
router.get('/disciplinas/:disciplinaId/materiais', MaterialController.obterMateriaisDisciplina);

// Rota para atualizar um material didático
//router.put('/:materialId', MaterialController.atualizarMaterial);

// Rota para excluir um material didático
//router.delete('/:materialId', MaterialController.excluirMaterial);

module.exports = router;
