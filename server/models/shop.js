const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const Shop = sequelize.define('Shop', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  x_location: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  y_location: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Street_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
    freezeTableName: true,
    timestamps: false
  });

module.exports = Shop;
