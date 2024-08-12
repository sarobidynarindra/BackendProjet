const ClientsContributeursGuides = require('../model/ClientsContributeursGuides');
const ContributeursGuides = require('../model/ContributeursGuides');
const Exercices = require('../model/Exercices');
const TypesExercices = require('../model/TypesExercices');
const sequelize = require('../db');  
const { QueryTypes } = require('sequelize');

const getAllExerciceParFormation = async (req, res) => {
    const { id_contributeurs_guides } = req.params;
    if (!id_contributeurs_guides) {
      return res.status(400).json({ error: 'id_contributeurs_guides is required' });
    }
    try {
      const exercices = await Exercices.findAll({
        where: { id_contributeurs_guides: id_contributeurs_guides },
        include: [
          { model: TypesExercices, as: 'typesexercice',attributes: ['type'] },
          { model: ContributeursGuides, as: 'contributeurs_guide', attributes: ['nom', 'prix', 'image', 'pdf', 'audio', 'video', 'presentation', 'description'] }
        ]
      });
      return res.json(exercices);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  //Tous les questions par exercice et par types et par formation
  const getQuestionsExercice = async (req, res) => {
    const { id_contributeurs_guides, idExercice, type } = req.query;

    if (!id_contributeurs_guides || !idExercice || !type) {
        return res.status(400).json({ error: 'Missing required query parameters: id_contributeurs_guides, id, type' });
    }

    const query = `
        SELECT 
            e.id AS idexercice,
            e.nomexercice,
            qe.id AS question_id, 
            qe.question, 
            o.id AS option_id, 
            o.option_text, 
            o.is_correct, 
            te.type
        FROM 
            questionExercice qe
        JOIN 
            Exercices e ON qe.id_exercice = e.id
        JOIN 
            TypesExercices te ON e.id_type = te.id
        LEFT JOIN 
            OptionsReponse o ON qe.id = o.id_question
        WHERE 
            e.id_contributeurs_guides = $1 AND e.id = $2 AND te.type = $3;
    `;

    try {
      const result = await sequelize.query(query, {
          type: QueryTypes.SELECT,
          bind: [id_contributeurs_guides, idExercice, type]
      });

      if (result.length === 0) {
          return res.status(404).json({ error: 'Pas encore exercices pour cette type' });
      }

      const groupedQuestions = result.reduce((acc, row) => {
          const { idexercice, nomexercice, question_id, question, option_id, option_text, is_correct, type } = row;

          if (!acc[idexercice]) {
              acc[idexercice] = {
                  idexercice,
                  nomexercice,
                  type,
                  questions: {}
              };
          }

          if (!acc[idexercice].questions[question_id]) {
              acc[idexercice].questions[question_id] = {
                  question_id,
                  question,
                  options: []
              };
          }

          if (option_id) {
              acc[idexercice].questions[question_id].options.push({ option_id, option_text, is_correct });
          }

          return acc;
      }, {});

      const formattedResponse = Object.values(groupedQuestions).map(exercice => {
          return {
              ...exercice,
              questions: Object.values(exercice.questions)
          };
      });

      res.json(formattedResponse);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
const createExercice = async (req, res) => {
    const { id_contributeurs_guides, nomexercice, descriptionexo, id_type } = req.body;

    if (!id_contributeurs_guides || !nomexercice ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const contributeurs = await ContributeursGuides.findByPk(id_contributeurs_guides);
        if (!contributeurs) {
            return res.status(404).json({ message: 'contributeur guide not found' });
        }

        const type = await TypesExercices.findByPk(id_type);
        if (!type) {
            return res.status(404).json({ message: 'Type not found' });
        }
        
        const exercice = await Exercices.create({
            id_contributeurs_guides,
            nomexercice,
            descriptionexo,
            id_type,
        });

        
        res.status(201).json(exercice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    getAllExerciceParFormation,
    getQuestionsExercice,
    createExercice,
};