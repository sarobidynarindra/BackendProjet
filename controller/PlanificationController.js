const Planification = require('../model/Planification');
const Exercices = require('../model/Exercices');
const Frequence = require('../model/Frequence');

const addPlanifications = async (req, res) => {
    const planifications = req.body;
  
    if (!planifications || !Array.isArray(planifications)) {
      return res.status(400).json({ error: 'Invalid input format' });
    }
  
    try {
      const newPlanifications = [];
  
      for (const plan of planifications) {
        const { id_exercices, jours, nombrefois, heure, dateplanification } = plan;
  
        if (id_exercices == null) {
          return res.status(400).json({ error: 'Missing id_exercices in one of the planifications' });
        }
        if (!jours) {
          return res.status(400).json({ error: 'Missing jours in one of the planifications' });
        }
        if (!nombrefois) {
          return res.status(400).json({ error: 'Missing nombrefois in one of the planifications' });
        }
        if (!heure) {
          return res.status(400).json({ error: 'Missing dateplanification in one of the planifications' });
        }
        if (!dateplanification) {
          return res.status(400).json({ error: 'Missing dateEtHeure in one of the planifications' });
        }
  
        const newPlanification = await Planification.create({
          id_exercices,
          jours,
          nombrefois,
          heure,
          dateplanification   
        });
  
        newPlanifications.push(newPlanification);
      }
  
      return res.status(201).json({ message: 'Planifications added successfully', data: newPlanifications });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  addPlanifications,
};
