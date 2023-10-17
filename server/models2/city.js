const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Voivodeship_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'voivodeship',
        key: 'id'
      }
    }
  }, {
    tableName: 'city',
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
        name: "City_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_City_Voivodeship1_idx",
        using: "BTREE",
        fields: [
          { name: "Voivodeship_id" },
        ]
      },
    ]
  });
};
