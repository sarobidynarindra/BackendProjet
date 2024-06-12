const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const ContributeursGuides = require('./ContributeursGuides');
const Clients = require('../model/Clients');

const ClientsContributeursGuides = sequelize.define('clients_contributeurs_guides', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_client: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Clients,
        key: 'id',
      },
  },
  id_contributeurs_guides: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ContributeursGuides,
      key: 'id',
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  cle_parcours: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'clients_contributeurs_guides',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

// Définir l'association
ContributeursGuides.hasMany(ClientsContributeursGuides, { foreignKey: 'id_contributeurs_guides' });
ClientsContributeursGuides.belongsTo(ContributeursGuides, { foreignKey: 'id_contributeurs_guides' });

module.exports = ClientsContributeursGuides;