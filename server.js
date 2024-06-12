let express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
let app = express();


const authRoutes = require('./routes/authRoutes');
const formationClientRoutes = require('./routes/formationClientRoutes');
let bodyParser = require('body-parser');

const multer = require('multer');

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false, // Désactiver le logging de Sequelize (optionnel)
});

// Synchroniser les modèles avec la base de données
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');

    await sequelize.sync(); // Synchroniser les modèles avec la base de données

    // Démarrer le serveur une fois que tout est configuré
    app.listen(port, () => {
      console.log(`Serveur en écoute sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
})();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// les routes
const prefix = '/api';
// Ajouter les routes
app.use(prefix + '/auth', authRoutes);
app.use(prefix + '/getAllFormation', formationClientRoutes);

// Obligatoire si déploiement dans le cloud !
let port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);


module.exports = app;


