const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();
const app = express();

const authRoutes = require('./routes/authRoutes');
const formationClientRoutes = require('./routes/formationClientRoutes');
const exercices = require('./routes/ExercicesRoutes');
const planification = require('./routes/PlanificationRoutes');
const typeExercice= require('./routes/TypesRoutes');
const bodyParser = require('body-parser');
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

// Middleware pour body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware pour CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Définir les routes
const prefix = '/api';
app.use(prefix + '/auth', authRoutes);
app.use(prefix + '/getAllFormation', formationClientRoutes);
app.use(prefix + '/Exercices', exercices);
app.use(prefix + '/Planification', planification);
app.use(prefix + '/TypeExercice', typeExercice);
// Obligatoire si déploiement dans le cloud !
const port = process.env.PORT || 10001;

// Synchroniser les modèles avec la base de données et démarrer le serveur
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie');

    await sequelize.sync(); // Synchroniser les modèles avec la base de données

    // Démarrer le serveur une fois que tout est configuré
    app.listen(port, '0.0.0.0', () => {
      console.log(`Serveur en écoute sur le port ${port}`);
    });
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
})();

module.exports = app;
