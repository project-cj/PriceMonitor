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
        type: DataTypes.STRING(45),
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
/*
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    type: {type: String, required: true},
})
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, type: this.type, email: this.email}, process.env.JWTPRIVATEKEY, {
        expiresIn: "1h",
    })
    return token
}
const User = mongoose.model("User", userSchema)

module.exports = User
*/