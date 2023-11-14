const router = require("express").Router()
const path = require('path')

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

const {validate, validatePassword} = require("../controllers/userController.js")
const bcrypt = require("bcrypt");
const shop_has_product = require("../models2/shop_has_product.js");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        console.log(validate(req.body))
        console.log(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        const user = await models.user.findOne({ where: { email: req.body.email }})
        if (user)
            return res.status(409).send({ message: "Użytkownik już istnieje!" })
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await models.user.create({ ...req.body, password: hashPassword, status: "USER", x_location: 0.0, y_location: 0.0, radius: 2.0})
        res.status(201).send({ message: "Użytkownik zarejestrowany pomyślnie" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})

router.post("/changeAlias", async (req, res) => {
    try {
        const alias = req.body.alias;
        if (alias === '')
            return res.status(400).send({message: "Nie podano nowego pseudonimu"})
        const user = await models.user.findOne({ where: { alias: alias }})
        if (user)
            return res.status(409).send({ message: "Pseudonim jest w użyciu" })

            
        const updateAlias = {
            alias: alias
        };
        
        await models.user.update(updateAlias, {
            where: {
                id: req.body.id
            }
        })
        res.status(201).send({ message: "Pseudonim został pomyślnie zmieniony" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})

router.post("/changeRadius", async (req, res) => {
    try {
        const radius = req.body.radius;
        const id = req.body.id;
        if (radius === null)
            return res.status(400).send({message: "Nie podano nowego promienia"})
            
        const updateRadius = {
            radius: radius
        };
        
        await models.user.update(updateRadius, {
            where: {
                id: id
            }
        })
        res.status(201).send({ message: "Promień został pomyślnie zmieniony" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Nie podano nowego promienia" })
    }
})


router.post("/changePassword", async (req, res) => {
    try {
        const newPassword = req.body.newPassword;
        const oldPassword = req.body.oldPassword;
        const repPassword = req.body.repPassword;

        const {error} = validatePassword(req.body);
        
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        
        const user = await models.user.findOne({ where: { id: req.body.id }})
        const validPassword = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!validPassword)
            return res.status(401).send({ message: "Nieprawidłowe obecne hasło" })
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt)
        
        const updatePassword = {
            password: hashPassword
        };
        
        await models.user.update(updatePassword, {
            where: {
                id: req.body.id
            }
        })
        res.status(201).send({ message: "Hasło zostało pomyślnie zmienione" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd serwera" })
    }
})



router.get("/userpanel/:id", async (req,res) => {
    const id = req.params.id;
    try {
        const userData = await models.user.findByPk(id, {
            include: [
                {
                    model: models.shoppinglist,
                    as: 'shoppinglists'
                },
                {
                    model: models.price_read,
                    as: 'price_reads',
                    include: [
                        {
                            model: models.shop_has_product,
                            as: 'Shop_has_Product',
                            include: [
                                {
                                    model: models.product,
                                    as: 'Product'
                                }
                            ]
                        }
                    ],
                    order: [['date_from', 'DESC']]
                }

            ]
        })
        console.log(userData)
        res.json(userData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania danych użytkownika.' });
      }
})


module.exports = router