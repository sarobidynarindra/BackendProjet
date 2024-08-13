const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 
const Exercices = require('./Exercices');


const questionExercice = sequelize.define('questionexercice', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_exercice: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Exercices,
        key: 'id',
      },
  },
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  tableName: 'questionexercice',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

questionExercice.belongsTo(Exercices, { foreignKey: 'id_exercice' });

module.exports = questionExercice;
