const express = require('express');
const router = express.Router();

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

router.get('/', async (req, res) => {
  try {
    const cities = await models.city.findAll();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania miast.' });
  }
});


router.post('/searchStreet', async (req, res) => {
  try {
    const city = req.body.city;

    const streets = await models.street.findAll({
      include: [{
        model: models.city,
        as: 'City',
        where: {
          id: city
        }
      }]
    })
    console.log(streets)
    res.json(streets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania sklepów.' });
  }
})



module.exports = router;