const Nota = require('../models/Nota');
const authorizationLevels = require('../helpers/authorizations');
const User = require('../models/Users');
const Disciplina = require('../models/disciplinaModel');


module.exports = class NotaController {
  static async criarNota (req, res) {
    try {
      // Extrair os dados da requisição
      const { nota } = req.body;
      const { disciplinaId, alunoId} = req.params;
      console.log('disciplinaId: ',disciplinaId,'alunoId :',alunoId)
      // Verifique se o usuário possui permissão para lançar notas
      //const userRole = req.user.role;
      //if (authorizationLevels[userRole].includes('lancarNotas')) {
        const novaNota = new Nota({
          aluno: alunoId,
          disciplina: disciplinaId ,
          nota,
         // responsavel: req.user._id,
          
        })
        console.log('novaNota', novaNota)

      //Criar uma nova nota no banco de dados
      await novaNota.save();

      res.status(201).json({ message: 'nota lançada com sucesso' });
  //} 
   //else {
       
      //}
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
      /// const userRole = req.user.role;
    //   if (authorizationLevels[userRole].includes('lancarNotas')) {
         // Atualizar a nota no banco de dados
      const notaAtualizada = await Nota.findByIdAndUpdate(notaId, { nota }, { new: true });
      // Retornar a nota atualizada
      res.status(201).json({ message: 'Nota atualizada com sucesso' });
    
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
          model: User,
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
          model: User,
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
        alunoId: nota.aluno._id, // Incluímos o alunoId aqui
        aluno: nota.aluno.firstName,
        disciplina: nota.disciplina.nome,
        disciplinaId : nota.disciplina._id,
        
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

      console.log(notas)
  
      // Calcule a média das notas
      const totalNotas = notas.length;
      console.log(totalNotas)
      const somaNotas = notas.reduce((acumulador, nota) => acumulador + nota.nota, 0);
console.log(somaNotas)
  
      const media = somaNotas / totalNotas;
 
      if(media>=7){
        res.status(200).json({ message:'Aprovado' , media});
      } else {
        res.status(200).json({ message:'Reprovado', media });
      }

  
     
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao calcular a média do aluno.' });
    }
  };

  static async notasAlunoDisciplina(req, res) {
    try {
      const { disciplinaId, alunoId } = req.params;
  
      // Buscar todas as notas da disciplina no banco de dados
      const notasDisciplina = await Nota.find({ disciplina: disciplinaId ,aluno: alunoId})
        .populate({
          path: 'aluno',
          model: User,
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
        alunoId: nota.aluno._id, // Incluímos o alunoId aqui
        aluno: nota.aluno.firstName,
        disciplina: nota.disciplina.nome,
        disciplinaId : nota.disciplina._id,
        
        nota: nota.nota,
        __v: nota.__v,
      }));
  
      res.json(notasDisciplinaComNomeAluno);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Erro ao obter notas da disciplina.' });
    }
  };
  

};


