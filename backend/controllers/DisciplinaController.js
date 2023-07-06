const Disciplina = require('../models/disciplinaModel');
const Professor = require('../models/Professor');
const User = require('../models/Users');
const mongoose = require('mongoose');


const authorizationLevels = require('../helpers/authorizations');

module.exports = class DisciplinaController {
  static async createDisciplina(req, res) {
    try {
      const { nome, descricao, creditos, cargaHoraria } = req.body;

      // Verifique se os campos obrigatórios foram fornecidos
      if (!nome || !creditos || !cargaHoraria) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
      }

      // Verifique se o usuário possui permissão para criar disciplinas
      const userRole = req.user.role;
      if (authorizationLevels[userRole].includes('createDisciplinas')) {
        const disciplina = new Disciplina({
          nome,
          descricao,
          creditos,
          cargaHoraria,
        });

        // Salve a disciplina no banco de dados
        await disciplina.save();

        res.status(201).json({ message: 'Disciplina criada com sucesso' });
      } else {
        res.status(403).json({ error: 'Acesso não autorizado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a disciplina' });
    }
  };

  static async adicionarProfessor(req, res) {
    try {
      const { disciplinaId, professorId } = req.body;

      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);

      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      // Adicione o professor à disciplina
      disciplina.professores.push(professorId);

      // Salve as alterações no banco de dados
      await disciplina.save();

      res.json({ message: 'Professor adicionado à disciplina com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao adicionar professor à disciplina' });
    }
  };

  // Função para remover um professor de uma disciplina
  static async removerProfessor(req, res) {
    try {
      const { disciplinaId, professorId } = req.body;

      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);

      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      // Remova o professor da disciplina
      disciplina.professores = disciplina.professores.filter(
        (id) => id !== professorId
      );

      // Salve as alterações no banco de dados
      await disciplina.save();

      res.json({ message: 'Professor removido da disciplina com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao remover professor da disciplina' });
    }
  };
  static async listarDisciplinas(req, res) {
    try {
      // Lógica para listar as disciplinas
      const disciplinas = await Disciplina.find();
      res.json(disciplinas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar as disciplinas' });
    }
  }

  static async obterDisciplina(req, res) {
    try {
      // Lógica para obter uma disciplina pelo ID
      const disciplina = await Disciplina.findById(req.params.id);
      res.json(disciplina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao obter a disciplina' });
    }
  }

  // Função para atualizar uma disciplina
  static async updateDisciplina(req, res) {
    try {
      const { nome, descricao, creditos, cargaHoraria } = req.body;
      const disciplinaId = req.params.id;

      // Verifique se os campos obrigatórios foram fornecidos
      if (!nome || !creditos || !cargaHoraria) {
        return res.status(400).json({ error: 'Campos obrigatórios não fornecidos' });
      }

      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);

      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      // Atualize os campos da disciplina
      disciplina.nome = nome;
      disciplina.descricao = descricao;
      disciplina.creditos = creditos;
      disciplina.cargaHoraria = cargaHoraria;

      // Salve as alterações no banco de dados
      await disciplina.save();

      res.json({ message: 'Disciplina atualizada com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar a disciplina' });
    }
  }

  // Função para excluir uma disciplina
  static async deleteDisciplina(req, res) {
    try {
      const disciplinaId = req.params.id;

      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);

      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      // Remova a disciplina pelo ID
      await Disciplina.deleteOne({ _id: disciplinaId });

      res.json({ message: 'Disciplina excluída com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao excluir a disciplina' });
    }
  }

  // Função para associar um professor a uma disciplina
  static async associarProfessorDisciplina(req, res) {
    try {
      const { disciplinaId, professorId } = req.params;

      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);

      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      // Encontre o professor pelo ID
      const professor = await Professor.findById(professorId);

      // Verifique se o professor existe
      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      // Adicione o professor à disciplina
if (!disciplina.professores) {
  disciplina.professores = []; // Initialize as an empty array if undefined
}


      // Adicione o ID do professor à lista de professores da disciplina
      disciplina.professores.push(professorId);
      console.log(disciplina.professores)

      // Adicione a disciplina ao professor
    professor.disciplinas.push(disciplinaId);

      // Salve as alterações no banco de dados
      await disciplina.save();
      await professor.save();
      console.log(disciplina.professores)

      res.json({ message: 'Professor associado à disciplina com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao associar professor à disciplina' });
    }
  }

  static async removerProfessorDisciplina(req, res) {
    try {
      const { disciplinaId, professorId } = req.params;

      // Encontre a disciplina pelo ID
      const disciplina = await Disciplina.findById(disciplinaId);

      // Verifique se a disciplina existe
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }

      // Verifique se o professor está associado à disciplina
      if (!disciplina.professores.includes(professorId)) {
        return res.status(404).json({ error: 'Professor não encontrado nesta disciplina' });
      }

      // Remova o professor da lista de professores da disciplina
      disciplina.professores = disciplina.professores.filter(
        (id) => id.toString() !== professorId
      );

      // Salve as alterações no banco de dados
      await disciplina.save();

      res.json({ message: 'Professor removido da disciplina com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao remover professor da disciplina' });
    }
  }



  static async lancarPresenca(req, res) {
    try {
      const { disciplinaId } = req.params;
      const { presencas } = req.body;
      /*       
Nesta linha, estamos usando um loop for...of para percorrer cada objeto de 
presença dentro do array presencas recebido na requisição. Para cada objeto de presença, 
desestruturamos as propriedades alunoId e presente usando a sintaxe de desestruturação do JavaScript.
 */
      // Verificar se a disciplina existe
      const disciplina = await Disciplina.findById(disciplinaId);
      if (!disciplina) {
        return res.status(404).json({ message: 'Disciplina não encontrada.' });
      }
     // Inicializar contadores
let totalPresente = 0;
let totalAusente = 0;
let ausenciaAluno = 0;
      const presencasArray = [];
      // Percorrer o array de presenças recebido
      for (const presenca of presencas) {
        const { alunoId, presente } = presenca;
        
        // Verificar se o aluno existe
        const aluno = await User.findById(alunoId);
        if (!aluno) {
          return res.status(404).json({ message: 'Aluno não encontrado.' });
        }
       // const novaPresenca = {descomentaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar
       //   aluno: alunoId,
       //   presente: presente
       // };
        // Adicionar presença ao array de presenças da disciplina  
      //  disciplina.presencas.push(novaPresenca);             DESCOMENTARRRRRRRRRRRRRRRRRR

// Adicionar presença ao array de presenças da disciplina
disciplina.presencas.push({ aluno: alunoId, presente: presente });


        // Adicionar presença ao array de presenças da disciplina
     //   presencasArray.push({ aluno: alunoId, presente: presente });    DESCOMENTARRRRRRRRRRRRRRRRRRRRR
        
        // Verificar se o aluno está presente
  // Verificar se o aluno está presente
  

      //  presencasArray.push(novaPresenca); descomentaaaaaaaaaaaaaaaaaaaaat

      }

      

    
      // Salvar disciplina no banco de dados
      await disciplina.save();
      

     const totalPresencas = presencas
     //const presencasFaltas = false
     const presencasFaltas = presencas.filter(presenca => presenca.presente === false);

     // Exibir os IDs dos registros com presente = false
     for (const presenca of disciplina.presencas) {
      if(presenca.presente === false ){
        totalAusente++
       
       // console.log(presenca.presente);
      } else{
        totalPresente++

      }
      
    }

    console.log('total presenças: ',totalPresente);
    console.log('total ausencias: ',totalAusente);
    


      return res.status(200).json({ message: `total de presenças: ${totalPresente} , total de ausÊncias:  ${totalAusente}` });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro ao lançar presenças.' });
    }

  }

  static async removerFalta(req, res) {
    try {
      const { disciplinaId, presencaId, alunoId } = req.params;
  console.log(presencaId)
      // Verificar se a disciplina existe
      const disciplina = await Disciplina.findById(disciplinaId);
      if (!disciplina) {
        return res.status(404).json({ message: 'Disciplina não encontrada.' });
      }
  
      const ObjectId = mongoose.Types.ObjectId;
      // Verificar se o aluno tem falta na disciplina
      const faltaIndex = disciplina.presencas.findIndex(presenca => {
        return presenca.aluno.toString() === alunoId && 
        presenca._id.equals(new mongoose.Types.ObjectId(presencaId));
      });
      
      console.log(faltaIndex)
    
        
      

      if (faltaIndex !== -1) {
        // Encontrou a presença correspondente
        // Remover a falta utilizando o índice encontrado
        disciplina.presencas.splice(faltaIndex, 1);
        // Salvar disciplina no banco de dados
        await disciplina.save();
        return res.status(200).json({ message: 'Falta removida com sucesso.' });
      } else {
        // Não encontrou a presença correspondente
        return res.status(404).json({ message: 'Falta não encontrada para o aluno nesta disciplina.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro ao remover falta.' });
    }
  }
  
 // Função para registrar uma nova aula em uma disciplina
static async registrarAula(req, res) {
  try {
    const { disciplinaId } = req.params;
    const { assunto, data } = req.body;

    // Verifique se a disciplina existe
    const disciplina = await Disciplina.findById(disciplinaId);
    if (!disciplina) {
      return res.status(404).json({ error: 'Disciplina não encontrada' });
    }

    // Crie um novo objeto de aula com as informações fornecidas
    const novaAula = {
      assunto,
      data,
    };

    // Adicione a nova aula à lista de aulas da disciplina
    disciplina.aulas.push(novaAula);

    // Salve as alterações na disciplina
    await disciplina.save();

    res.json({ message: 'Aula registrada com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao registrar a aula' });
  }
} 


}




  // ...








