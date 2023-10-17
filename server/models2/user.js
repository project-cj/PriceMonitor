const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "User_email_UNIQUE"
    },
    alias: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "User_alias_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    x_location: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    y_location: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    radius: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    forgotten_password_link: {
      type: DataTypes.STRING(150),
      allowNull: true
    }
  }, {
    tableName: 'user',
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
        name: "User_alias_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "alias" },
        ]
      },
      {
        name: "User_id_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "User_email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
