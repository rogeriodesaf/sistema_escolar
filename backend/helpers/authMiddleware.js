const jwt = require('jsonwebtoken');


// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    // Verifique se o token de autenticação está presente no cabeçalho da solicitação
    const token = req.headers.authorization;
    console.log('req.headers.authorization:  ',req.headers.authorization)
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }
    const tokenWithoutBearer = token.split(' ')[1]; // Remove o prefixo "Bearer"
    console.log('tokenWithoutBearer: ',tokenWithoutBearer)
    try {
      console.log('entrou aqui')
       const decoded = jwt.verify(tokenWithoutBearer, 'seuSegredoAqui'); // Substitua 'seuSegredoAqui' pelo seu segredo do JWT
      console.log('Token decodificado:',decoded);
      if (decoded && decoded.role) {
       
        // A propriedade 'role' está presente no token
        const { role } = decoded;
        req.user = decoded; // Adicione os dados do usuário decodificado à solicitação para uso posterior
        
        // Chame o próximo middleware ou rota
        console.log('passou aqui?')
        next();
      }
     
      else {
        console.log('não entrou no try')
        // A propriedade 'role' não está presente no token
        throw new Error('Token inválido');
      }   console.log('não entrou no try 2', decoded.userId ) 
    } catch (error) {
      console.log('não entrou no try 3', token ) 
      return res.status(401).json({ error: "não dá assim" });
    }
  };


  module.exports = authMiddleware;