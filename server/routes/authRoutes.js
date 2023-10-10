const router = require("express").Router()
const path = require('path')
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const Joi = require("joi")
router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ where: { email: req.body.email }})
        console.log(user)
        if (!user)
            return res.status(401).send({ message: "Invalid Email or Password" })
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        console.log("X")
        console.log(await bcrypt.compare("Password1#", "$2b$10$b/L672SFqG4G67mdGNTDPe/dpgkHN2B2YO/M3m"))
        if (!validPassword)
            return res.status(401).send({ message: "Invalid Email or Password" })
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" })
        console.log('User logged in')
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
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
