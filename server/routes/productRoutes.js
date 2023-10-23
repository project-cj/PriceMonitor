const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

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
      const product = await models.product.findByPk(id, {
        include: [
          {
            model: models.brand,
            as: 'Brand'
          },
          {
            model: models.subcategory,
            as: 'Subcategory',
            include: [
              {
                model: models.category,
                as: 'Category'
              }
            ]
          },
          {
            model: models.shop_has_product,
            as: 'shop_has_products',
            include: [
              {
                model: models.shop,
                as: 'Shop'
              }
            ]
          }
        ]
      });
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Produkt nie został znaleziony.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktu.' });
    }
  });
  
module.exports = router;