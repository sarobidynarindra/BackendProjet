const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Clients = sequelize.define('clients', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nomutilisateur: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_verification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_activated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
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

module.exports = Clients;
