const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Assurez-vous que le chemin est correct
const Clients = require('../model/Clients');
const Password_client = sequelize.define('password_clients', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  id_client: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
        model: Clients,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
  },
  mdp: {
    type: DataTypes.STRING(250),
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
  tableName: 'password_clients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Password_client;
