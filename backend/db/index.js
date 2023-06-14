const mongoose = require('mongoose');
const dbURI = require('./connection');

const connectToDatabase = () => {
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conexão com o MongoDB estabelecida');
    })
    .catch((error) => {
      console.error('Erro ao conectar com o MongoDB:', error);
    });
};

module.exports = connectToDatabase;
