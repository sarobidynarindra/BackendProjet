const express = require('express');
const router = express.Router();
const exercice= require('../controller/ExerciceController');
const question= require('../controller/QuestionController');
// Route pour la connexion
router.get('/getAllExerciceParFormation/:id_contributeurs_guides', exercice.getAllExerciceParFormation);
router.get('/getQuestionsExercice',exercice.getQuestionsExercice);
router.post('/creationExercice',exercice.createExercice);
router.post('/createquestion',question.createquestion);
module.exports = router;
