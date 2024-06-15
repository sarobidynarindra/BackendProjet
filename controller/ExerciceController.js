const ClientsContributeursGuides = require('../model/ClientsContributeursGuides');
const ContributeursGuides = require('../model/ContributeursGuides');
const Exercices = require('../model/Exercices');
const TypesExercices = require('../model/TypesExercices');

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

module.exports = {
    getAllExerciceParFormation,
};