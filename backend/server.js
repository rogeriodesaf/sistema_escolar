const express = require('express');
const app = express();
const port = 5000;
const connectToDatabase = require('./db');
const authMiddleware = require('./helpers/authMiddleware');
const cors = require('cors');


// Conecte-se ao banco de dados
connectToDatabase();





/* rotas */
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const cursoRoutes = require('./routes/cursoRoutes');
const disciplinaRoutes = require('./routes/disciplinaRoutes');
const notaRoutes = require('./routes/notaRoutes')
const materialRoutes = require('./routes/materialRoutes')
const historicoRoutes = require('./routes/historicoAluno')





// Importa a conexão com o banco de dados
//require('./db/connection');

// Resto do código do servidor
// ...
app.use(cors({
  origin: 'http://localhost:3000',
}));


// Middlewares de parser de JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas


/* Isso define o prefixo /api/auth para todas as rotas definidas no arquivo auth.js. 
Por exemplo, a rota /login será acessada em /api/auth/login.   */
app.use('/api/auth', authRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/notas', notaRoutes);
app.use('/api/material',materialRoutes)
app.use('/api/historico', historicoRoutes);


app.use('/',homeRoutes);
// Middleware global para todas as rotas
app.use(authMiddleware);


// Outros middlewares e definições de rotas...


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
