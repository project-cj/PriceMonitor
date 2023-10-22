const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const Shop = require('../models2/shop.js')(sequelize, DataTypes);

router.get('/', async (req, res) => {
    try {
      const shops = await Shop.findAll();
      res.json(shops);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania sklepów.' });
    }
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const shop = await Shop.findByPk(id);
      if (shop) {
        res.json(shop);
      } else {
        res.status(404).json({ error: 'Sklep nie został znaleziony.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania sklepu.' });
    }
  });
  router.post('/search', async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania produktów.' });
    }
  })
module.exports = router;