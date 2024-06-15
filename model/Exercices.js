const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const TypesExercices = require('./TypesExercices');
const ContributeursGuides = require('./ContributeursGuides');

const Exercices = sequelize.define('exercices', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_contributeurs_guides: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: ContributeursGuides,
        key: 'id',
      },
  },
  nomexercice: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionexo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: TypesExercices,
        key: 'id',
      },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Exercices.belongsTo(TypesExercices, { foreignKey: 'id_type' });
Exercices.belongsTo(ContributeursGuides, { foreignKey: 'id_contributeurs_guides' });

module.exports = Exercices;
