const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

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
      const shop = await models.shop.findByPk(id,{
        include: [{
          model: models.street,
          as: 'Street',
          include: [{
            model: models.city,
            as: 'City',
            include: [{
              model: models.voivodeship,
              as: 'Voivodeship'
            }]
          }]
        },
        {
          model: models.shop_has_product,
          as: 'shop_has_products',
          include: [{
            model: models.price_read,
            as: 'price_reads'
          },
        {
          model: models.product,
          as: 'Product',
          include: [{
            model: models.brand,
            as: 'Brand'
          }]
        }]
        }
      ]
      });
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