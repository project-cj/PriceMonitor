const express = require('express');
const router = express.Router(); 
const ShopHasAProduct = require('../models/shophasaproduct.js');

router.get('/', async (req, res) => {
    try {
      const shopHasAProducts = await ShopHasAProduct.findAll();
      res.json(shopHasAProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania relacji ShopHasAProduct.' });
    }
  });
  router.get('/api/shophasaproducts/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const shopHasAProduct = await ShopHasAProduct.findByPk(id);
      if (shopHasAProduct) {
        res.json(shopHasAProduct);
      } else {
        res.status(404).json({ error: 'Relacja ShopHasAProduct nie została znaleziona.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania relacji ShopHasAProduct.' });
    }
  });

module.exports = router;