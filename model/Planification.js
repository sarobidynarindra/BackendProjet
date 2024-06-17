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
  id_frequence: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Frequence,
      key: 'id'
    }
  },
  dateetheure: {
    type: DataTypes.DATE,
    allowNull: false
  }
},
{
    tableName: 'planification',
    timestamps: false
});

Exercices.hasMany(Planification, { foreignKey: 'id_exercices' });
Frequence.hasMany(Planification, { foreignKey: 'id_frequence' });
Planification.belongsTo(Exercices, { foreignKey: 'id_exercices' });
Planification.belongsTo(Frequence, { foreignKey: 'id_frequence' });

module.exports = Planification;
