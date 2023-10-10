const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    alias:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    x_location:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    y_location:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    radius:{
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING(45),
        allowNull: false
    },
    forgotten_password_link:{
        type: DataTypes.STRING(150),
    }
}, {
    freezeTableName: true,
    timestamps: false
})

module.exports = User