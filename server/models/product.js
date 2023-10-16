const sequelize = require('../db'); 
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Product', {
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
  code: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  Subcategory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});

module.exports = Product;
