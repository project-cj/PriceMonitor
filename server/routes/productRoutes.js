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

  router.get('/:id/:shopId', async (req, res) => {
    const id = req.params.id;
    const shopId = req.params.shopId;
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
                as: 'Shop',
                where: {
                  id: shopId
                },
                include: [
                  {
                    model: models.street,
                    as: 'Street',
                    include: [
                      {
                        model: models.city,
                        as: 'City'
                      }
                    ]
                  }
                ]
              },
              {
                model: models.price_read,
                as: 'price_reads',
                include: [
                  {
                    model: models.user,
                    as: 'User'
                  }
                ],
                order: [['date_from', 'DESC']]
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

  router.get('/:id/:shopId', async (req, res) => {
    const id = req.params.id;
    const shopId = req.params.shopId;
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
                as: 'Shop',
                where: {
                  id: shopId
                },
                include: [
                  {
                    model: models.street,
                    as: 'Street',
                    include: [
                      {
                        model: models.city,
                        as: 'City'
                      }
                    ]
                  }
                ]
              },
              {
                model: models.price_read,
                as: 'price_reads',
                include: [
                  {
                    model: models.user,
                    as: 'User'
                  }
                ],
                order: [['date_from', 'DESC']]
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

  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const priceRead = await models.price_read.destroy({
        where: {
          id: id
        }
      });
      if (priceRead === 1){
        res.status(200).send();
      } else {
        res.status(404).json({ error: 'Odczyt nie został znaleziony.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas usuwania ceny produktu.' });
    }
  });


  router.post('/add', async (req, res) => {
    try {
      const shop = req.body.shop;
      const product = req.body.product;
      const price = req.body.price;
      const startDate = req.body.startDate;
      const endDate = req.body.endDate;
      const id = req.body.id;
      console.log("id:",id, shop, product, price, startDate, endDate);
      const shop_has_product = await models.shop_has_product.findOne({ where: { Shop_id: shop, Product_id: product }})
      if(shop_has_product){
        const price_read = await models.price_read.create({price: price, date_from: startDate, date_to: endDate, confirmation_number: 0, rejected_number: 0, Shop_has_Product_id: shop_has_product.id, Currency_id: 1, User_id: id});
      } else {
        const shop_product = await models.shop_has_product.create({Shop_id: shop, Product_id: product});
        const price_read = await models.price_read.create({price: price, date_from: startDate, date_to: endDate, confirmation_number: 0, rejected_number: 0, Shop_has_Product_id: shop_product.id, Currency_id: 1, User_id: id});
      }
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
    }
  });


  router.post("/confirm", async (req, res) => {
    try {
        const id = req.body.id;
        const confirm = await models.price_read.findOne({where : {id: id}})
        if (confirm) {
          await confirm.increment('confirmation_number');
        } else {
          console.log('Nie znaleziono modelu.');
        }
        res.status(201).send({ message: "Potwierdzono cenę" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd przy potwierdzaniu ceny" })
    }
  })

  router.post("/reject", async (req, res) => {
    try {
        const id = req.body.id;
        const reject = await models.price_read.findOne({where : {id: id}})
        if (reject) {
          await reject.increment('rejected_number');
        } else {
          console.log('Nie znaleziono modelu.');
        }
        res.status(201).send({ message: "Odrzucono cenę" })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Błąd przy odrzucaniu ceny" })
    }
  })
module.exports = router;