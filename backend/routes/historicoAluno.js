const express = require('express');
const router = express.Router();

// Importar o controller do histórico do aluno
const historicoAlunoController = require('../controllers/historicoAlunoController');

// Rota para obter o histórico do aluno
router.get('/:alunoId', historicoAlunoController.obterHistoricoAluno);

module.exports = router;
