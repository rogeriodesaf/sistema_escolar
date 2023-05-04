const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'sistema_escolar';

const client = new MongoClient(uri, {
  useUnifiedTopology: true,
});

let db;

module.exports = new Promise((resolve, reject) => {
  client.connect()
    .then(() => {
      console.log('Conectado com sucesso ao MongoDB!');
      db = client.db(dbName);
      resolve(db);
    })
    .catch(err => {
      console.log('Erro ao conectar ao MongoDB:', err);
      reject(err);
    });
});
