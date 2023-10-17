const express = require('express');
const router = express.Router();

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const City = require('../models2/city.js')(sequelize, DataTypes); 

router.get('/', async (req, res) => {
  try {
    const cities = await City.findAll();
    res.json(cities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania miast.' });
  }
});




module.exports = router;