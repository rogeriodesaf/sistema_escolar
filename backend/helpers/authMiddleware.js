const jwt = require('jsonwebtoken');


// Middleware de autenticação
const authMiddleware = (req, res, next) => {
    // Verifique se o token de autenticação está presente no cabeçalho da solicitação
    const token = req.headers.authorization;
    
    
    if (!token) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }
    const tokenWithoutBearer = token.split(' ')[1]; // Remove o prefixo "Bearer"
    
    try {
      const decoded = jwt.verify(tokenWithoutBearer, 'seuSegredoAqui');  // Substitua 'seuSegredoAqui' pelo seu segredo do JWT
      
      if (decoded && decoded.role) {
       
        // A propriedade 'role' está presente no token
        const { role } = decoded;
        req.user = decoded; // Adicione os dados do usuário decodificado à solicitação para uso posterior
        
        // Chame o próximo middleware ou rota
        next();
      } else {
        // A propriedade 'role' não está presente no token
        throw new Error('Token inválido');
      }
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  };


  module.exports = authMiddleware;