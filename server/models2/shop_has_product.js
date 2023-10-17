const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shop_has_product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Shop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shop',
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
    tableName: 'shop_has_product',
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
        name: "fk_Shop_has_Product_Product1_idx",
        using: "BTREE",
        fields: [
          { name: "Product_id" },
        ]
      },
      {
        name: "fk_Shop_has_Product_Shop1_idx",
        using: "BTREE",
        fields: [
          { name: "Shop_id" },
        ]
      },
    ]
  });
};
