// models/ContributeursGuides.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const ContributeursGuides = sequelize.define('contributeurs_guides', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_guide: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_contributeur: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pdf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  audio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  presentation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  }
}, {
  tableName: 'contributeurs_guides',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = ContributeursGuides;

