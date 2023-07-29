// AuthController.js
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Disciplina = require('../models/disciplinaModel');
const authorizationLevels = require('../helpers/authorizations')




module.exports = class AuthController {
  static async register(req, res) {
    const { email, password, role, firstName, lastName } = req.body;

    try {
      // Verifica se o usuário já está registrado
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Usuário já registrado' });
      }

      // Gera um novo salt com fator de custo 10
      const salt = await bcrypt.genSalt(10);

      // Gera o hash da senha usando o salt
      const hashedPassword = await bcrypt.hash(password, salt);

      // Cria um novo usuário com a senha criptografada e o salt
      const user = new User({
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,

      });

      

      // Salva o usuário no banco de dados

      await user.save()


      res.json({ message: 'Registro bem-sucedido' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar o usuário' });
    }
  };

  // Função para fazer login
  static async login(req, res) {
    // Lógica de autenticação do usuário
    const { email, password } = req.body;

    try {
      // Verifique se o usuário existe com o email fornecido
      const user = await User.findOne({ email });

      // Verifique se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' , message: 'Mensagem de erro específica' });
      }

      // Verifique se a senha fornecida é válida
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // Verifique se a senha está correta
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }
      
      // Gerar o token JWT
      const token = jwt.sign({ userId: user._id ,role: user.role}, 'seuSegredoAqui', { expiresIn: '1h' });
      // Retornar o token JWT junto com a resposta de sucesso
      res.json({ message: 'Login bem-sucedido', token });
    }

    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  };



  static async forgotPassword(req, res) {
    const { email } = req.body;
    
    //try {
    // Verifica se o usuário existe com o e-mail fornecido
    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Gera um token único para a redefinição de senha
    const token = crypto.randomBytes(20).toString('hex');
    

    // Define a data de expiração para o token (por exemplo, 1 hora a partir de agora)
    const expires = Date.now() + 3600000; // 1 hora em milissegundos

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save()

    // Envie um e-mail de recuperação de senha contendo o link para redefinição

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: true,
      service: 'Gmail',
      auth: {
        user: 'rogeriodesaf@gmail.com',
        pass: 'xbxdqajenoumymao',
      },
    });


    // Cria um link de redefinição de senha com o token
    const resetLink = `http://localhost:3000/api/auth/students/reset-password/${token}`;
    const mailOptions = {
      from: 'rogeriodesaf@gmail.com',
      to: email,
      subject: 'Recuperação de Senha',
      html: `<p>Olá, você solicitou a recuperação de senha para a sua conta .Clique no<a href='${resetLink}'> link</a> a seguir para redefinir sua senha:
       Copie o seu Token para redefinição de senha: ${token} </p>`
      // ${process.env.RESET_PASSWORD_URL}/${token}`,
    };

    new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions)
        .then(res => {
          transporter.close()
          return resolve(res)
        }).catch(error => {
          console.log(error);
          transporter.close()
          return reject(error);
        })
      console.log(`E-mail de recuperação de senha enviado para ${email}:`);
      res.json({ message: 'E-mail de recuperação de senha enviado' });

    });

  };


  static async resetPassword(req, res) {
    const { token, password } = req.body;
    console.log(token)
    try {
      // Encontre o usuário com o token de redefinição de senha válido
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      // Verifique se o usuário foi encontrado
      if (!user) {
        return res.status(400).json({ error: 'Token inválido ou expirado' });
      }

      // Criptografe a nova senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Defina a nova senha criptografada para o usuário
      user.password = hashedPassword;


      // Limpe o token e a data de expiração
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      // Salve o usuário com a nova senha e os campos atualizados
      await user.save();

      res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao redefinir a senha' });
    }

  };
  static async matricularAluno(req, res) {
    const { disciplinaId, alunoId } = req.params;
  
    try {
      // Verifica se o aluno existe
      const user = await User.findById(alunoId);
      if (!user) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
  
      // Verifica se a disciplina existe
      const disciplina = await Disciplina.findById(disciplinaId);
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
  
      // Verifica se o aluno já está matriculado na disciplina
      if (user.disciplinas.includes(disciplinaId)) {
        return res.status(400).json({ error: 'Aluno já está matriculado nesta disciplina' });
      }
  
      // Matricula o aluno na disciplina
      user.disciplinas.push(disciplinaId);
      await user.save();
  
      // Adiciona o aluno na disciplina
      disciplina.alunos.push(alunoId);
      await disciplina.save();
  
      res.json({ message: 'Aluno matriculado com sucesso na disciplina' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao realizar a matrícula' });
    }
  };
  
  static async desmatricularAluno(req, res) {
    const { disciplinaId, alunoId } = req.params;
  
    try {
      // Verificar se a disciplina existe
      const disciplina = await Disciplina.findById(disciplinaId);
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
  
      // Verificar se o aluno está matriculado na disciplina
      const aluno = await User.findById(alunoId);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
  
      // Verificar se o aluno está matriculado na disciplina
      const index = aluno.disciplinas.indexOf(disciplinaId);
      if (index === -1) {
        return res.status(400).json({ error: 'Aluno não está matriculado nesta disciplina' });
      }
  
      // Remover o aluno da disciplina
      aluno.disciplinas.splice(index, 1);
      await aluno.save();
  
      res.json({ message: 'Aluno removido com sucesso da disciplina' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao remover o aluno da disciplina' });
    }
  }
  
  static async listarDisciplinasMatriculadas(req, res) {
    try {
      const { alunoId } = req.params;
  
      // Verifica se o aluno existe
      const aluno = await User.findById(alunoId).populate('disciplinas');
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
  
      // Retorna a lista de disciplinas matriculadas pelo aluno
      res.json({ disciplinas: aluno.disciplinas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter a lista de disciplinas matriculadas' });
    }
  }

  static async listarAlunos(req, res) {
    try {
      // Lógica para listar as disciplinas
      const alunos = await User.find();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar os alunos' });
    }
  }

  static async alunosMatriculadosEmUmaDisciplina(req, res) {
    try {
      const { disciplinaId } = req.params;
  
      // Verifica se a disciplina existe
      const disciplina = await Disciplina.findById(disciplinaId).populate('alunos');
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
  
      // Retorna a lista de alunos matriculados na disciplina
      res.json({ alunos: disciplina.alunos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter a lista de alunos matriculados na disciplina' });
    }
  }
  
  static async contadorPresencas(req, res) {
    try {
      const { alunoId, disciplinaId } = req.params;
  
      // Verifica se a disciplina existe
      const disciplina = await Disciplina.findById(disciplinaId);
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
  
      // Verifica se o aluno existe
      const aluno = await User.findById(alunoId);
      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

 
  
     
      // Filtra as presenças do aluno na disciplina
      let contadorPresencas = 0;
      let contadorFaltas = 0;

      console.log('alunoId:', alunoId); // Verificação do valor de alunoId
      
   for (let i = 0; i < disciplina.presencas.length; i++) {
  const presenca = disciplina.presencas[i];

  if (presenca.aluno.toString() === alunoId.toString()) {
    if (presenca.presente === true) {
      contadorPresencas++;
    } else {
      contadorFaltas++;
    }
  }
}

      
      console.log('contadorPresencas:', contadorPresencas); // Verificação do valor final do contador
      console.log('contadorFaltas:', contadorFaltas); 
  
      // Conta a quantidade de presenças
      //const quantidadePresencas = presencasAluno.length;

      return res.json({ contadorPresencas , contadorFaltas });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ocorreu um erro ao contar as presenças' });
    }
  }
  
  static async obterPresencasEFaltasPorDisciplina(req, res) {
    try {
      const { alunoId, disciplinaId } = req.params;
  
      // Buscar a disciplina pelo id
      const disciplina = await Disciplina.findById(disciplinaId);
  
      if (!disciplina) {
        return res.status(404).json({ error: 'Disciplina não encontrada' });
      }
  
      // Buscar as informações de presenças e faltas do aluno na disciplina
      const alunoDisciplina = disciplina.alunos.find((aluno) => aluno._id === alunoId);
      console.log(disciplina.alunos)

      console.log(disciplina.alunos._id)
      
  
      if (!alunoDisciplina) {
        return res.status(404).json({ error: 'Aluno não encontrado nesta disciplina' });
      }
  
      const { presencas, faltas } = alunoDisciplina;
  
      res.json({ presencas, faltas });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar informações de presenças e faltas' });
    }
  }
  static async getAlunoById(req, res) {
    try {
      const { alunoId } = req.params;
      const aluno = await User.findById(alunoId);

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      // Aqui você pode escolher quais informações do professor quer retornar
      // Estou retornando um objeto contendo apenas o nome do professor neste exemplo
      const alunoInfo = { name: aluno.firstName };

      res.json(alunoInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter informações do aluno' });
    }


  };


};







