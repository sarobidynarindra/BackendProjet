
const Type = require('../model/TypesExercices');

const getAllTypesExercices = async (req, res) => {
    try {
      
      const typesExercices = await Type.findAll();
  
     
      res.status(200).json(typesExercices);
    } catch (error) {
      
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    getAllTypesExercices,
  };