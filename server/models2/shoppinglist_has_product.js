const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shoppinglist_has_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    isBought: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ShoppingList_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shoppinglist',
        key: 'id'
      }
    },
    Product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id'
      }
    }
  }, {
    tableName: 'shoppinglist_has_product',
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
        name: "fk_ShoppingList_has_Product_Product1_idx",
        using: "BTREE",
        fields: [
          { name: "Product_id" },
        ]
      },
      {
        name: "fk_ShoppingList_has_Product_ShoppingList1_idx",
        using: "BTREE",
        fields: [
          { name: "ShoppingList_id" },
        ]
      },
    ]
  });
};
