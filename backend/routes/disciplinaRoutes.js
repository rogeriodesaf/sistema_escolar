const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')
const DisciplinaController = require('../controllers/DisciplinaController')
const jwt = require('jsonwebtoken');
const ProfessorController = require('../controllers/ProfessorController');
const authorizationLevels = require('../helpers/authorizations');
const authMiddleware = require('../helpers/authMiddleware');
const CoordenadorController = require('../controllers/CoordenadorController');





// Rota para criar uma disciplina
router.post('/', authMiddleware, DisciplinaController.createDisciplina);

router.get('/disciplinas',DisciplinaController.obterDisciplina );
router.get('/disciplinas/listar',DisciplinaController.listarDisciplinas);

// Outras rotas para manipulação de disciplinas
// Atualizar uma disciplina existente
router.put('/:id', authMiddleware, DisciplinaController.updateDisciplina);

// Excluir uma disciplina existente
router.delete('/:id', authMiddleware, DisciplinaController.deleteDisciplina);

// Rota para associar um professor a uma disciplina
router.post('/:disciplinaId/professores/:professorId', DisciplinaController.associarProfessorDisciplina);

// Rota para remover um professor de uma disciplina
router.delete('/:disciplinaId/professores/:professorId',authMiddleware, DisciplinaController.removerProfessorDisciplina);

// rota correspondente para o lançamento de presenças:
router.post('/:disciplinaId/presencas',  DisciplinaController.lancarPresenca);

// rota correspondente para remover faltas:
router.delete('/:disciplinaId/faltas/:presencaId/aluno/:alunoId', authMiddleware, DisciplinaController.removerFalta);


// Rota para registrar uma nova aula em uma disciplina
router.post('/disciplinas/:disciplinaId/aulas', DisciplinaController.registrarAula);


module.exports = router;
