const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Exercices = require('./Exercices');
const Frequence = require('./Frequence');

const Planification = sequelize.define('planification', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  id_exercices: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Exercices,
      key: 'id'
    }
  },
  nombrefois:{
    type: DataTypes.STRING,
    allowNull:false
  },
  heure:{
    type: DataTypes.TIME,
    allowNull:false
  },
  dateplanification: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
},
{
    tableName: 'planification',
    timestamps: false
});

Exercices.hasMany(Planification, { foreignKey: 'id_exercices' });
Planification.belongsTo(Exercices, { foreignKey: 'id_exercices' });

module.exports = Planification;
