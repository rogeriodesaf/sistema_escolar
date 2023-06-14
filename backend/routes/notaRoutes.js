const express = require('express');
const router = express.Router();
const authMiddleware = require('../helpers/authMiddleware');
const NotaController = require('../controllers/NotaController');

// Rota para criar uma nova nota
router.post('/', authMiddleware, NotaController.criarNota);

// Rota para atualizar uma nota existente
router.put('/:notaId', authMiddleware, NotaController.atualizarNota);

// Rota para obter as notas de um aluno específico
router.get('/aluno/:alunoId', authMiddleware, NotaController.obterNotasAluno);

// Rota para obter as notas de uma disciplina específica
router.get('/disciplina/:disciplinaId', authMiddleware, NotaController.obterNotasDisciplina);

// Outras rotas relacionadas a notas...
// Rotas para cálculo da média do aluno em uma disciplina
router.get('/alunos/:alunoId/disciplinas/:disciplinaId/media', NotaController.calcularMediaAluno);


module.exports = router;
