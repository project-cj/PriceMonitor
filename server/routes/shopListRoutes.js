const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)


router.get('/', async (req, res) => {
  try {
    const shops = await models.shop.findAll();
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
  }
});

router.post('/search', async (req, res) => {
  try {
    const city = req.body.city

    const shops = await models.shop.findAll({
      include: [{
        model: models.street,
        as: 'Street',
        include: [{
          model: models.city,
          as: 'City',
          where: {
            name: city
          },
          include: [{
            model: models.voivodeship,
            as: 'Voivodeship'
          }]
        }]
      }]
    })
    console.log(shops)
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania sklepów.' });
  }
})

module.exports = router;
