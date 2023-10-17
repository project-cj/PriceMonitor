const sequelize = require('../db.js');
const { DataTypes } = require('sequelize');

const ShopHasAProduct = sequelize.define('shop_has_product', {
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
