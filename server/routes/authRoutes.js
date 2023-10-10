const router = require("express").Router()
const path = require('path')
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const Joi = require("joi")
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ where: { email: req.body.email }})
        if (!user)
            return res.status(401).send({ message: "Nieprawidłowy adres email lub hasło" })
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword)
            return res.status(401).send({ message: "Nieprawidłowy adres email lub hasło" })
        const token = jwt.sign({ id: user.id, status: user.status, email: user.email}, process.env.JWTPRIVATEKEY, {
            expiresIn: "5h",
        })
        res.status(200).send({ data: token, message: "Zalogowano" })
        console.log('User logged in')
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    })
    return schema.validate(data)
}
module.exports = router
