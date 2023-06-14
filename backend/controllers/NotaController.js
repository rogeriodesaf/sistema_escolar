const Nota = require('../models/Nota');
const authorizationLevels = require('../helpers/authorizations');
const Users = require('../models/Users');
const Disciplina = require('../models/disciplinaModel');


module.exports = class NotaController {
  static async criarNota (req, res) {
    try {
      // Extrair os dados da requisição
      const { aluno, disciplina, nota } = req.body;

      // Verifique se o usuário possui permissão para lançar notas
      const userRole = req.user.role;
      if (authorizationLevels[userRole].includes('lancarNotas')) {
        const novaNota = new Nota({
          aluno,
          disciplina,
          nota,
          responsavel: req.user._id,
          
        })

      // Criar uma nova nota no banco de dados
      await novaNota.save();

      res.status(201).json({ message: 'nota lançada com sucesso' });
    } else {
        res.status(403).json({ error: 'Acesso não autorizado' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao criar nota.' });
    }
  };

  static  async atualizarNota (req, res) {
    try {
      // Extrair o ID da nota da URL e os dados atualizados da requisição
      const { notaId } = req.params;
      const { nota } = req.body;

       // Verifique se o usuário possui permissão para lançar notas
       const userRole = req.user.role;
       if (authorizationLevels[userRole].includes('lancarNotas')) {
         // Atualizar a nota no banco de dados
      const notaAtualizada = await Nota.findByIdAndUpdate(notaId, { nota }, { new: true });
      // Retornar a nota atualizada
      res.status(201).json({ message: 'Nota atualizada com sucesso' });
    } else {
      res.status(403).json({ error: 'Usuário não autorizado a lançar notas.' });
    }
 } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao atualizar nota.' });
    }
  };

  static async obterNotasAluno(req, res) {
    try {
      const { alunoId } = req.params;
  
      // Buscar todas as notas do aluno no banco de dados
      const notasAluno = await Nota.find({ aluno: alunoId })
        .populate({
          path: 'aluno',
          model: Users,
          select: 'firstName',
        })
        .populate('disciplina', 'nome');
  
      // Mapear as notas para incluir o nome da disciplina na resposta
      const notasAlunoComNomeDisciplina = notasAluno.map((nota) => ({
        _id: nota._id,
        aluno: nota.aluno.firstName,
        disciplina: nota.disciplina.nome,
        nota: nota.nota,
        __v: nota.__v,
      }));
  
      res.json(notasAlunoComNomeDisciplina);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao obter notas do aluno.' });
    }
  };
  static async obterNotasDisciplina(req, res) {
    try {
      const { disciplinaId } = req.params;
  
      // Buscar todas as notas da disciplina no banco de dados
      const notasDisciplina = await Nota.find({ disciplina: disciplinaId })
        .populate({
          path: 'aluno',
          model: Users,
          select: 'firstName',
        })
        .populate({
          path: 'disciplina',
          model: Disciplina,
          select: 'nome',
        });
  
      // Mapear as notas para incluir o nome do aluno e o nome da disciplina na resposta
      const notasDisciplinaComNomeAluno = notasDisciplina.map((nota) => ({
        _id: nota._id,
        aluno: nota.aluno.firstName,
        disciplina: nota.disciplina.nome,
        nota: nota.nota,
        __v: nota.__v,
      }));
  
      res.json(notasDisciplinaComNomeAluno);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao obter notas da disciplina.' });
    }
  };
  // Outros métodos relacionados às notas...
  static async calcularMediaAluno(req, res) {
    try {
      const { alunoId, disciplinaId } = req.params;
  
      // Encontre todas as notas do aluno na disciplina
      const notas = await Nota.find({ aluno: alunoId, disciplina: disciplinaId });
  
      // Calcule a média das notas
      const totalNotas = notas.length;
      const somaNotas = notas.reduce((acumulador, nota) => acumulador + nota.nota, 0);
      const media = somaNotas / totalNotas;
  
      // Determine se o aluno foi aprovado ou reprovado com base na média
      const status = media >= 7 ? 'Aprovado' : 'Reprovado';
  
      res.json({ media, status });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao calcular média do aluno.' });
    }
  }
  

};


