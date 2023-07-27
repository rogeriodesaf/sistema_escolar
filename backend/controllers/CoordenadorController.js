const Coordenador = require('../models/Coordenador');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authorizationLevels = require('../helpers/authorizations');



// Função para registrar um professor
module.exports = class CoordenadorController {

  static async register(req, res) {
    const { name, sobrenome, email, password } = req.body;

    try {
        // Verifica se o usuário já está registrado
        const existingUser = await Coordenador.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Usuário já registrado' });
        }
  
        // Gera um novo salt com fator de custo 10
        const salt = await bcrypt.genSalt(10);
  
        // Gera o hash da senha usando o salt
        const hashedPassword = await bcrypt.hash(password, salt);
  
        // Cria um novo usuário com a senha criptografada e o salt
        const user = new Coordenador({
          name,
          sobrenome,
          email,
          password :hashedPassword,
        
        });
  
        console.log(user)
  
        // Salva o usuário no banco de dados
  
        await user.save()
  
  
        res.json({ message: 'Registro bem-sucedido' });
      }
      catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao registrar o coordenador' });
      }
    }

  // Função para fazer login
  static async login(req, res) {
    // Lógica de autenticação do usuário
    const { email, password } = req.body;

    try {
      // Verifique se o usuário existe com o email fornecido
      const user = await Coordenador.findOne({ email });

      // Verifique se o usuário foi encontrado
      if (!user) {
        return res.status(404).json({ error: 'CAIU AQUI?' });
      }

      // Verifique se a senha fornecida é válida
      const isPasswordValid = await bcrypt.compare(password, user.password);

      // Verifique se a senha está correta
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Gerar o token JWT
      const token = jwt.sign({ userId: user._id, role: user.role }, 'seuSegredoAqui', { expiresIn: '11h' });
     console.log(token)
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
    const user = await Coordenador.findOne({ email });

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
      const user = await Coordenador.findOne({
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

  static async getCoordenadorById(req, res) {
    try {
      const { coordenadorId } = req.params;
      const coordenador = await User.findById(coordenadorId);

      if (!coordenador) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      // Aqui você pode escolher quais informações do professor quer retornar
      // Estou retornando um objeto contendo apenas o nome do professor neste exemplo
      const coordenadorInfo = { name: coordenador.name };

      res.json(coordenadorInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao obter informações do aluno' });
    }


  };

};









