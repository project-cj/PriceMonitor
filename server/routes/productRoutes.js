const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const Product = require('../models2/product.js')(sequelize, DataTypes);

router.get('/', async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
    }
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log("ID:", id)
    try {
      const product = await Product.findByPk(id);
      if (product) {
        res.send(product);
      } else {
        res.status(404).json({ error: 'Produkt nie został znaleziony.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktu.' });
    }
  });
  
module.exports = router;