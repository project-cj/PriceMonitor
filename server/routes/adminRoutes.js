const express = require('express');
const router = express.Router(); 

const {DataTypes} = require('sequelize');
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)


router.get('/getproposals', async (req, res) => {
  try {
    const proposals = await models.shop.findAll({
        where: {
            status: "NIEAKTYWNY"
        }
    });
    res.status(200).send(proposals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania propozycji sklepów.' });
  }
});
router.post('/saveproposal', async (req, res) => {
    try {
      const proposal = await models.shop.findOne({
        where: {
            id: req.body.id
        }
      })
      console.log(proposal)
      proposal.name = req.body.name
      proposal.x_location = req.body.x_location
      proposal.y_location = req.body.y_location
      proposal.status="AKTYWNY"
      proposal.address = req.body.address
      proposal.Street_id = req.body.street_id
      console.log(proposal)
      proposal.save()
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Wystąpił błąd podczas pobierania propozycji sklepów.' });
    }
  });
router.get('/getusers', async (req, res) => {
  try {
    const users = await models.user.findAll({
      where: {
        status: "USER"
      }
    })
    console.log(users)
    res.status(200).send(users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania użytkowników.' });
  }
})
router.post('/deleteuser', async (req, res) => {
  try {
    console.log("delete user request")
    const user = await models.user.findOne({
      where: {
        id: req.body.userID
      }
    })
    await user.destroy()
    res.status(200).send()
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Wystąpił błąd podczas usuwania użytkownika.' });
  }
})

module.exports = router;
