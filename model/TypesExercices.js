const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const TypesExercices = sequelize.define('typesexercices', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
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
  
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = TypesExercices;
