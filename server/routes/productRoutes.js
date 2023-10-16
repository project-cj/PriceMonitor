const express = require('express');
const router = express.Router(); 
const Product = require('../models/product.js');


router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
  }
});

router.get('/api/products/:id', async (req, res) => {
  const productId = req.params.id; 
  console.log('productId:', productId);
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ error: 'Produkt o podanym ID nie został znaleziony.' });
    } else {
     console.log('Product:', product);
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania szczegółów produktu.' });
  }
});

module.exports = router;
