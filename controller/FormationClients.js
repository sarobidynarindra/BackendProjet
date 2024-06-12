const ClientsContributeursGuides = require('../model/ClientsContributeursGuides');
const ContributeursGuides = require('../model/ContributeursGuides');
const Clients = require('../model/Clients');

const getAllWithCleParcours = async (req, res) => {
  try {
    const { cle_parcours } = req.query;

    const records = await ClientsContributeursGuides.findAll({
      where: {
        cle_parcours: cle_parcours
      },
      include: [
        {
          model: ContributeursGuides,
          attributes: ['id', 'nom', 'prix', 'image', 'pdf', 'audio', 'video', 'presentation', 'description']
        }
      ]
    });

    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching records with cle_parcours:', error);
    res.status(500).json({ error: 'An error occurred while fetching records.' });
  }
};

module.exports = {
  getAllWithCleParcours,
};