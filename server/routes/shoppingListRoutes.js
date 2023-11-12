const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)
const jwt = require("jsonwebtoken");



router.get('/', async (req, res) => {
  try {
    const token = req.header('Authorization'); 

    if (!token) {
      return res.status(401).json({ error: 'Brak autoryzacji' });
    }
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const shoppingLists = await models.shoppinglist.findAll({
      where: { User_id: decoded.id }, 
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
  const { shoppingListId, productId } = req.body;
  try {
    const shoppingList = await models.shoppinglist.findByPk(shoppingListId);
    const product = await models.product.findByPk(productId);
    
    if (!shoppingList || !product) {
      return res.status(404).json({ error: 'Nie znaleziono listy zakupów lub produktu' });
    }

    const newItem = await models.shoppinglist_has_product.create({
      ShoppingList_id: shoppingList.id,
      Product_id: product.id,
      isBought: 0, 
    });

    res.json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Nie udało się dodać produktu do listy zakupów' });
  }
});

router.get('/:id/products', async (req, res) => {
  
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Brak autoryzacji' });
    }

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    const selectedListId = req.params.id;

    const selectedListProducts = await models.shoppinglist_has_product.findAll({
      where: { ShoppingList_id: selectedListId },
      include: [
        {
          model: models.product,
          as: 'Product'
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



module.exports = router;
 