const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)


router.get('/', async (req, res) => {
  try {
    const products = await models.product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
  }
});

router.post('/search', async (req, res) => {
  try {
    const city = req.body.city
    productId = req.body.product

    const products = await models.shop.findAll({
      attributes: [
        'name',
        'address',
      ],
      include: [
        {
          model: models.shop_has_product,
          as: 'shop_has_products',
          include: [
            {
              model: models.product,
              as: 'Product',
              where: {
                id: productId
              },
            },
            {
              model: models.price_read,
              as: 'price_reads',
              attributes: [
                [sequelize.fn('MIN', sequelize.col('price')), 'minPrice'],
                [sequelize.fn('MAX', sequelize.col('price')), 'maxPrice'],
              ]
            },
          ],
        },
        {
          model: models.street,
          as: 'Street',
          attributes: ['name'],
          include: [
            {
              model: models.city,
              as: 'City',
              where: {
                name: city
              },
            },
          ],
        },
      ],
    });
    console.log(products)
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania produktów.' });
  }
})

    /*const products = await models.product.findAll({
      attributes: ['name'],
      where: {
        Id: product
      },
      include: [
        {
          model: models.shop_has_product, // Uwzględnij model ShopHasProduct
          as: 'shop_has_products',
          include: [
            {
              model: models.shop,
              as: 'Shop',
              include: [
                {
                  model: models.street,
                  as: 'Street',
                  include: [
                    {
                      model: models.city,
                      as: 'City',
                      where: {
                        name: city
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });
    
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania produktów.' });
  }
})*/

router.get('/:id', async (req, res) => {
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
