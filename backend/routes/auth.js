const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController')
const DisciplinaController = require('../controllers/DisciplinaController')
const jwt = require('jsonwebtoken');
const ProfessorController = require('../controllers/ProfessorController');
const authorizationLevels = require('../helpers/authorizations');
const authMiddleware = require('../helpers/authMiddleware');
const CoordenadorController = require('../controllers/CoordenadorController');






// Rota protegida que exige autenticação
router.get('/protegida', authMiddleware, (req, res) => {
  // Acesso permitido apenas para usuários autenticados
  res.json({ message: 'Rota protegida acessada com sucesso' });
});

// Outras rotas...



// Rota protegida para visualizar alunos
router.get('/students', authMiddleware, (req, res) => {
  // Verifique se o usuário possui permissão para visualizar alunos
  const userRole = req.user.role;
  
  if(
    authorizationLevels[userRole].includes('viewStudents') ||
    authorizationLevels[userRole].includes('gradeStudents')
  ) {
    // Lógica para visualizar alunos
    res.json({ message: 'Lista de alunos' });
  } else {
    res.status(403).json({ error: 'Acesso não autorizado' });
  }
});

// Rotas dos coordenadores
router.post('/coordenador/login', CoordenadorController.login);
router.post('/coordenador/register', CoordenadorController.register);
router.post('/coordenador/forgot-password', CoordenadorController.forgotPassword);
router.post('/coordenador/reset-password', CoordenadorController.resetPassword);
router.post('/coordenador/:coordenadorId', CoordenadorController.getCoordenadorById);




// Rotas dos professores
router.post('/professors/login', ProfessorController.login);
router.post('/professors/register', ProfessorController.register);
router.post('/professors/forgot-password', ProfessorController.forgotPassword);
router.post('/professors/reset-password', ProfessorController.resetPassword);
// Rota para listar os professores
router.get('/professors/listar', ProfessorController.listarProfessores);
// Rota para mostrar a disciplina que o professor vai lecionar com os alunos
router.get('/professores/:professorId/disciplinas', ProfessorController.listarDisciplinasProfessor);
// Rota para pegar as informações de um professor pelo Id
router.get('/professores/:professorId', ProfessorController.getProfessorById);

// Rotas dos alunos
router.post('/students/login', AuthController.login);
router.post('/students/register', AuthController.register);
router.post('/students/forgot-password', AuthController.forgotPassword);
router.post('/students/reset-password/:token', AuthController.resetPassword);
router.get('/students/listar', AuthController.listarAlunos);
// Rota para pegar as informações de um professor pelo Id
router.get('/alunos/:alunoId', AuthController.getAlunoById);

// Rota para matricular um aluno em uma disciplina
router.post('/disciplinas/:disciplinaId/alunos/:alunoId',AuthController.matricularAluno);
// Rota para desmatricular um aluno de uma disciplina
router.delete('/disciplinas/:disciplinaId/alunos/:alunoId',authMiddleware, AuthController.desmatricularAluno);
//router.get('/alunos/:alunoId/disciplinas', AuthController.listarDisciplinasMatriculadas);

router.get('/alunos/:alunoId/disciplinas', AuthController.listarDisciplinasMatriculadas);
//listar alunos matriculados em uma determinada disciplina
router.get('/disciplinas/:disciplinaId/alunos', AuthController.alunosMatriculadosEmUmaDisciplina);

router.get('/alunos/:alunoId/disciplinas/:disciplinaId/presencas',AuthController.contadorPresencas);

router.get('/aluno/:alunoId/disciplina/:disciplinaId', AuthController.obterPresencasEFaltasPorDisciplina);









// Outras rotas de autenticação...

// Rota para adicionar um professor a uma disciplina
router.post('/disciplinas/adicionar-professor', DisciplinaController.adicionarProfessor);
// Rota para remover um professor de uma disciplina
router.post('/disciplinas/remover-professor', DisciplinaController.removerProfessor);





module.exports = router;
