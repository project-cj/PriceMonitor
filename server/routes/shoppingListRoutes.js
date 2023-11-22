const express = require('express');
const router = express.Router(); 

const {DataTypes, Sequelize, Op} = require('sequelize');
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)
const jwt = require("jsonwebtoken");



router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const shoppingLists = await models.shoppinglist.findAll({
      where: { User_id: id }, 
    });
    res.json(shoppingLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się pobrać list zakupów' });
  }
});


router.post('/create-list', async (req, res) => {
  const name = req.body.name;
  const token = req.body.User_id;
;
  try {
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const User_id = decoded.id;
    
    const newShoppingList = await models.shoppinglist. create({  name : name, User_id: User_id});
    res.json(newShoppingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się utworzyć nowej listy zakupów' });
  }
});

router.post('/add-product', async (req, res) => {
  try {
    const { shoppingListId, productId } = req.body;
    const shoppingList = await models.shoppinglist.findByPk(shoppingListId);
    const product = await models.product.findByPk(productId);
    
    if (!shoppingList || !product) {
      return res.status(404).json({ error: 'Nie znaleziono listy zakupów lub produktu' });
    }

    const shoppingListHasProduct = await models.shoppinglist_has_product.findOne({
      where: {
        ShoppingList_id: shoppingListId,
        Product_id: productId
      }
    })    
    
    if(shoppingListHasProduct)
    {
      return res.status(404).json({ error: 'Produkt jest już na liście' });
    } else {
      const newItem = await models.shoppinglist_has_product.create({
        ShoppingList_id: shoppingList.id,
        Product_id: product.id,
        isBought: 0, 
      });
      res.status(201).send({ message: "Produkt został dodany do listy" })
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się dodać produktu do listy zakupów' });
  }
});

router.post('/listPrice', async (req,res) => {
  try{
    const { shoppingListId, userId } = req.body;
    const user = await models.user.findByPk(userId);
    const userX = user.x_location;
    const userY = user.y_location;
    const radius = user.radius * 1000;

    const nearbyShops = await models.shop.findAll({
      where: Sequelize.where(
        Sequelize.fn(
          'ST_Distance_Sphere',
          Sequelize.fn('POINT', Sequelize.literal('x_location'), Sequelize.literal('y_location')),
          Sequelize.fn('POINT', userX, userY)
        ),
        { [Op.lte]: radius } // Odległość w metrach (2km = 2000m)
      ),
      include: [
        {
          model: models.shop_has_product,
          as: 'shop_has_products'
        }
      ]
    });

    const shoppingList = await models.shoppinglist.findByPk(shoppingListId, {
      include: [
        {
          model: models.shoppinglist_has_product,
          as: 'shoppinglist_has_products'
        }
      ]
    });

    const listaProduktow = [];

    if (shoppingList) {
      shoppingList.shoppinglist_has_products.forEach(product => {
        listaProduktow.push(product.Product_id)
      });
    }

    var sklepyZProduktami = [];
    
    nearbyShops.forEach(shop => {
      var produkty = listaProduktow
      shop.shop_has_products.forEach(shopProduct => {
        if(produkty.includes(shopProduct.Product_id)){
          produkty = produkty.filter(item => item !== shopProduct.Product_id)
        }
      })
      if(produkty.length === 0){
        sklepyZProduktami.push(shop.id);
      }
    });
    
    var sklepyCeny = new Map();

    for(const sklep of sklepyZProduktami){
      var suma = 0;
      for(produkt of listaProduktow){
        const ceny = await models.price_read.findOne({
          include: [{
            model: models.shop_has_product,
            as: 'Shop_has_Product',
            where: {
              Product_id: produkt,
              Shop_id: sklep
            }
          }],
          order: [['date_from', 'DESC'],['confirmation_number','ASC']]
        });
        suma += ceny.price;
      }
      sklepyCeny.set(sklep,suma);
    }
    sklepyCeny.sort
    const obj = Object.fromEntries(sklepyCeny);
    res.json(obj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się obliczyć ceny listy' });
  }
})

router.get('/:id/products', async (req, res) => {
  
  try {
    const selectedListId = req.params.id;

    const selectedListProducts = await models.shoppinglist_has_product.findAll({
      where: { ShoppingList_id: selectedListId },
      include: [
        {
          model: models.product,
          as: 'Product',
          include: [
            {
              model: models.brand,
              as: 'Brand'
            }
          ]
        }
      ],
    });
    console.log('Selected List Products: ', selectedListProducts);

    res.json(selectedListProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się pobrać produktów z wybranej listy zakupów' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const productsInList = await models.shoppinglist_has_product.destroy({
      where: {
        ShoppingList_id: id
      }
    });
    const list= await models.shoppinglist.destroy({
      where: {
        id: id
      }
    });
    if (list === 1){
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Lista nie została znaleziona.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas usuwania listy zakupów.' });
  }
});

router.delete('/product/:ListId/:ProductId', async (req, res) => {
  const list_id = req.params.ListId;
  const product_id = req.params.ProductId;
  try {
    const productInList = await models.shoppinglist_has_product.destroy({
      where: {
        ShoppingList_id: list_id,
        Product_id: product_id
      }
    });
    if (productInList === 1){
      res.status(200).send();
    } else {
      res.status(404).json({ error: 'Produkt nie został znaleziony.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas usuwania produktu z listy zakupów.' });
  }
});



module.exports = router;
 