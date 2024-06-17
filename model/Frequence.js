const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Frequence = sequelize.define('frequence', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomfrequence: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});
module.exports = Frequence;
