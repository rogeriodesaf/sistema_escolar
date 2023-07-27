const Professor = require('../models/Professor');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorizationLevels = require('../helpers/authorizations');
const Disciplina = require('../models/disciplinaModel')
const User = require('../models/Users')


// Função para registrar um professor
module.exports = class ProfessorController {

  static async register(req, res) {
    const { name, sobrenome, email, password } = req.body;

    try {
      // Verifique se o professor já está registrado
      const existingProfessor = await Professor.findOne({ email });
      if (existingProfessor) {
        return res.status(500).json({ error: 'Este e-mail já está em uso, tente outro.', message: 'Mensagem de erro específica' });
      }
      // Gera um novo salt com fator de custo 10
      const salt = await bcrypt.genSalt(10);

      // Gera o hash da senha usando o salt
      const hashedPassword = await bcrypt.hash(password, salt);


      // Crie uma nova instância do modelo de Professor com os dados fornecidos
      const professor = new Professor({
        name,
        sobrenome,
        email,
        password: hashedPassword,
      });

      // Salve o professor no banco de dados
      await professor.save();

      res.json({ message: 'Registro do professor bem-sucedido' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao registrar o professor' });
    }
  }

  // Função para fazer login
  static async login(req, res) {
    // Lógica de autenticação do usuário
    const { email, password } = req.body;

    try {
      // Verifique se o usuário existe com o email fornecido
      const user = await Professor.findOne({ email });

      // Verifique se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado!' });
      }

      // Verifique se a senha fornecida é válida
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // Verifique se a senha está correta
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerar o token JWT
      const token = jwt.sign({ userId: user._id, role: user.role }, 'seuSegredoAqui', { expiresIn: '10h' });

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
    console.log(email)
    //try {
    // Verifica se o usuário existe com o e-mail fornecido
    const user = await Professor.findOne({ email });

    if (!user) {

      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Gera um token único para a redefinição de senha
    const token = crypto.randomBytes(20).toString('hex');
    console.log(`este é o ${token}`)

    // Define a data de expiração para o token (por exemplo, 1 hora a partir de agora)
    const expires = Date.now() + 3600000; // 1 hora em milissegundos

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expires;
    await user.save();

    // Gera um token de recuperação de senha (pode ser um código único ou um token JWT, por exemplo)
    //const token = 'gerar_token_aqui'; // Gere um token válido aqui
    // console.log(token)
    // Atualiza o campo de token de recuperação de senha no usuário
    // user.resetPasswordToken = token;
    // console.log(user.resetPasswordToken)
    // user.resetPasswordExpires = Date.now() + 3600000; // Token válido por 1 hora
    // console.log(user.resetPasswordExpires)
    //  await user.save();

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
    const resetLink = `http://localhost:3000/api/auth/reset-password/${token}`;
    const mailOptions = {
      from: 'rogeriodesaf@gmail.com',
      to: email,
      subject: 'Recuperação de Senha',
      html: `<p>Olá, você solicitou a recuperação de senha para a sua conta .Clique no<a href='${resetLink}'>link</a> a seguir para redefinir sua senha:</p>`
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

    try {
      // Encontre o usuário com o token de redefinição de senha válido
      const user = await Professor.findOne({
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

  static async listarProfessores(req, res) {
    try {
      // Consulte o banco de dados ou outra fonte de dados para obter a lista de professores
      const professores = await Professor.find();

      res.status(200).json(professores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar os professores.' });
    }

  }

  static async listarDisciplinasProfessor(req, res) {
    try {
      const { professorId } = req.params;
      console.log()
      // Verifique se o professor existe
      const professor = await Professor.findById(professorId);

      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      // Obtenha as disciplinas associadas ao professor
      const disciplinas = await Disciplina.find({ _id: { $in: professor.disciplinas } });

      res.json(disciplinas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar as disciplinas do professor' });
    }
  }
  static async getProfessorById(req, res) {
    try {
      const { professorId } = req.params;
      const professor = await Professor.findById(professorId);

      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      // Aqui você pode escolher quais informações do professor quer retornar
      // Estou retornando um objeto contendo apenas o nome do professor neste exemplo
      const professorInfo = { name: professor.name };

      res.json(professorInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter informações do professor' });
    }


  };

}









