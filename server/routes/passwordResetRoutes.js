const router = require("express").Router()
const path = require('path')
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const User = require("../models2/user.js")(sequelize, DataTypes)

const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

function validate(data){
    const schema = Joi.object({
        password: passwordComplexity().required().label("Hasło"),
        password_repeat: passwordComplexity().required().valid(Joi.ref('password')).label("Hasła nie są identyczne")
    })
    return schema.validate(data)
}

const transporter = nodemailer.createTransport({
    port: 465,               
    host: 'smtp-relay.brevo.com',
       auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
         },
    secure: true,
    });

router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email }})
        console.log(process.env.EMAIL)
        console.log(process.env.EMAIL_PASSWORD)
        if (user)
        {
            if(user.forgotten_password_link){
                user.forgotten_password_link = ""
                user.save()
            }
            let resetToken = crypto.randomBytes(32).toString("hex");
            const salt = await bcrypt.genSalt(Number(process.env.SALT))
            const hash = await bcrypt.hash(resetToken, salt)
            user.forgotten_password_link = hash;
            user.save();

            const link = `localhost:3000/passwordReset/change/?token=${resetToken}&id=${user.id}`;

            const mailData = {
                from: process.env.EMAIL,  // sender address
                  to: user.email,   // list of receivers
                  subject: 'ShopShare Password Reset',
                  text: 'Reset your password',
                  html: `<b>Shopshare password reset</b><br><a href="${link}">Link</a><br/>`,
            };
            transporter.sendMail(mailData, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
             });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})
router.post("/check", async (req, res) => {
    try {
        const token = req.body.token
        const id = req.body.id
        const user = await User.findOne({ where: { id: id }})
        if(user){
            const compareToken = await bcrypt.compare(token, user.forgotten_password_link)
            if(compareToken==true)
                res.status(200).send()
            else
                res.status(500).send()
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})
router.post("/change", async (req, res) => {
    try {
        const id = req.body.id
        const passwords = req.body.passwords
        const { error } = validate(passwords)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await User.findOne({ where: { id: id }})
        if(user){
            const salt = await bcrypt.genSalt(Number(process.env.SALT))
            const hashPassword = await bcrypt.hash(passwords.password, salt)
            user.password = hashPassword
            user.forgotten_password_link = null
            user.save()
            res.status(200).send({ message: "Haslo zmienione" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})
module.exports = router