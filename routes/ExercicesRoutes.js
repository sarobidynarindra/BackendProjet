const express = require('express');
const router = express.Router();
const exercice= require('../controller/ExerciceController');

// Route pour la connexion
router.get('/getAllExerciceParFormation/:id_contributeurs_guides', exercice.getAllExerciceParFormation);
router.get('/getQuestionsExercice',exercice.getQuestionsExercice);
router.post('/creationExercice',exercice.createExercice);
module.exports = router;
