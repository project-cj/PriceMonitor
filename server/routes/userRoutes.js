const router = require("express").Router()
const path = require('path')

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const User = require("../models2/user.js")(sequelize, DataTypes)

const validate = require("../controllers/userController.js")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        console.log(validate(req.body))
        console.log(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ where: { email: req.body.email }})
        if (user)
            return res.status(409).send({ message: "Użytkownik już istnieje!" })
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await User.create({ ...req.body, password: hashPassword, status: "USER", x_location: 0.0, y_location: 0.0, radius: 0.0})
        res.status(201).send({ message: "Użytkownik zarejestrowany pomyślnie" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})
module.exports = router