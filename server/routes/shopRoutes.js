const express = require('express');
const router = express.Router(); 
const Shop = require('../models/shop.js');

router.get('/', async (req, res) => {
    try {
      const shops = await Shop.findAll();
      res.json(shops);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania sklepów.' });
    }
  });

  router.get('/api/shops/:id', async (req, res) => {
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
  
module.exports = router;