const express = require('express');
const router = express.Router();
const City = require('../models/city.js'); 

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