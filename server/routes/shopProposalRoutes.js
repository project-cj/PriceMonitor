const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)


router.post('/', async (req, res) => {
  try {
    const lat = req.body.lat
    const lng = req.body.lng
    const name = req.body.name
    console.log(lat, lng, name)
    if(lat && lng && name){
        const shop = await models.shop.create({name: name, x_location: lat, y_location: lng, status: "NIEAKTYWNY", address: "", Street_id: 1})
    }
    res.status(200).send();
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
  }
});


module.exports = router;
