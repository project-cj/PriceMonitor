const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

router.get('/', async (req, res) => {
    try {
      const shops = await models.shop.findAll();
      res.json(shops);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania sklepów.' });
    }
  });

  router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
      const shop = await sequelize.query(
        `WITH ShopProductPrices AS (
          SELECT
            shp.id AS shop_product_id,
            p.name AS product_name,
            p.id AS product_id,
            s.name AS shop_name,
            s.address AS shop_address,
            s.id AS shop_id,
            pr.price AS price,
            b.name AS brand_name,
            ct.name AS city_name
          FROM
            shop s
          JOIN shop_has_product shp ON shp.Shop_id = s.id
          JOIN street st ON st.id = s.Street_id
          JOIN city ct ON ct.id = st.City_id
          JOIN product p ON p.id = shp.Product_id
          JOIN brand b ON b.id = p.Brand_id
          JOIN price_read pr ON pr.Shop_has_Product_id = shp.id
          WHERE
            s.id = :shopId
        )
        SELECT
          spp.shop_id,
          spp.shop_name,
          spp.shop_address,
          spp.product_name,
          spp.brand_name,
          spp.product_id,
          spp.city_name,
          MAX(spp.price) AS max_price,
          MIN(spp.price) AS min_price
        FROM
          ShopProductPrices spp
        GROUP BY
          spp.shop_id, spp.shop_name, spp.shop_address, spp.product_name;`,
        {
          type: sequelize.QueryTypes.SELECT,
          replacements: { shopId: id },
        }
      );
      if (shop) {
        console.log(shop);
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