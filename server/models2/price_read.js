const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('price_read', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_from: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_to: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    confirmation_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rejected_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Shop_has_Product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shop_has_product',
        key: 'id'
      }
    },
    Currency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'currency',
        key: 'id'
      }
    }
  }, {
    tableName: 'price_read',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_Price_Read_Shop_has_Product1_idx",
        using: "BTREE",
        fields: [
          { name: "Shop_has_Product_id" },
        ]
      },
      {
        name: "fk_Price_Read_Currency1_idx",
        using: "BTREE",
        fields: [
          { name: "Currency_id" },
        ]
      },
    ]
  });
};
