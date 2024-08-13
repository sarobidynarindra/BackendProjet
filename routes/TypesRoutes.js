const express = require('express');
const router = express.Router();
const typeexercice= require('../controller/TypeExerciceController');
// Route pour la connexion

router.get('/getTypeExo',typeexercice.getAllTypesExercices);

module.exports = router;
