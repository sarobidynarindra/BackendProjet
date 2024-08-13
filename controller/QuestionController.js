const ClientsContributeursGuides = require('../model/ClientsContributeursGuides');
const ContributeursGuides = require('../model/ContributeursGuides');
const Exercices = require('../model/Exercices');
const TypesExercices = require('../model/TypesExercices');
const QuestionExercice = require('../model/QuestionExercice');
const sequelize = require('../db');  
const { QueryTypes } = require('sequelize');

const createquestion = async (req, res) => {
    const { id_exercice, question } = req.body;

    if (!id_exercice || !question ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const exercices = await Exercices.findByPk(id_exercice);
        if (!exercices) {
            return res.status(404).json({ message: 'Exercice not found' });
        }
        
        const questionexercice = await QuestionExercice.create({
            id_exercice,
            question,
        });

        res.status(201).json(questionexercice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    createquestion,
};