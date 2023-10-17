const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const City = sequelize.define('City', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Voivodeship_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
},

},{
  freezeTableName: true,
  timestamps: false
});

module.exports = City;
