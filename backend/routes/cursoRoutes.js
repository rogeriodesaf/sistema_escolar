const express = require('express');

const CursoController = require('../controllers/CursoController');

const router = express.Router();

// Rota para obter todos os cursos
router.get('/cursos',CursoController.listarCursos);
// Rota para criar um novo curso
router.post('/cursos', CursoController.obterCurso);

// Outras rotas para manipulação de cursos

module.exports = router;
