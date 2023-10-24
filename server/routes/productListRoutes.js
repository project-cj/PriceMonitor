const express = require('express');
const router = express.Router(); 

const {DataTypes, Op} = require('sequelize');
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
    const productId = req.body.product

    const products = await sequelize.query(
      `WITH ShopProductPrices AS (
        SELECT
          shp.id AS shop_product_id,
          p.name AS product_name,
          s.name AS shop_name,
          s.address AS shop_address,
          pr.price AS price
        FROM
          shop s
        JOIN shop_has_product shp ON shp.Shop_id = s.id
        JOIN product p ON p.id = shp.Product_id
        JOIN price_read pr ON pr.Shop_has_Product_id = shp.id
  	    JOIN street st ON st.id = s.Street_id
  	    JOIN city ct ON ct.id = st.City_id
    	  WHERE
      	  p.id = :product AND ct.id = :cityName
      )
      
      SELECT
        spp.shop_product_id,
        spp.product_name,
        spp.shop_name,
        spp.shop_address,
        MAX(spp.price) AS max_price,
        MIN(spp.price) AS min_price
      FROM
        ShopProductPrices spp
      GROUP BY
        spp.shop_product_id, spp.product_name, spp.shop_name, spp.shop_address;`,
      {
        type: sequelize.QueryTypes.SELECT,
        replacements: { product: productId, cityName: city },
      }
    );
    console.log(products)
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas wyszukiwania produktów.' });
  }
})
router.get('/search_like/:word', async (req, res) => {
  const word = req.params.word;
  console.log(word)
  try {
    const products = await models.product.findAll({
      where: {
        name: {
          [Op.like] : [`${word}%`]
        }
      }
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania produktów.' });
  }
});

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
