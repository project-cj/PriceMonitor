const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const ShopHasAProduct = sequelize.define('ShopHasAProduct', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Shop_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = ShopHasAProduct;
