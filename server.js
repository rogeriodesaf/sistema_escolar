const express = require('express');
const db = require('./server/db');

const app = express();
const port = 3000;

db.then((database) => {
  console.log('Conexão com o banco de dados estabelecida!');

  app.get('/', (req, res) => {
    res.send('Olá, mundo!');
  });

  app.listen(port, () => {
    console.log(`Servidor iniciado na porta ${port}`);
  });
}).catch((err) => {
  console.log(err);
});
