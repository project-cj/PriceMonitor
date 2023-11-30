const request = require('supertest');
const app = require('../server');
require("dotenv").config();
const express = require('express');
const router = express.Router(); 
const sequelize = require('../db.js')
const {DataTypes} = require('sequelize');
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

describe('Testy endpointu "/api/shop/"', () => {
    it('Powinien zwrócić listę sklepów z kodem 200', async () => {
      const response = await request(app).get('/api/shop/');
      const shopsFromDatabase = await models.shop.findAll();
  
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(shopsFromDatabase));
    });

    it('Powinien obsłużyć błąd i zwrócić kod 500 w przypadku problemu z pobieraniem sklepów', async () => {
        sequelize.close();
        const response = await request(app).get('/api/shop/');
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Wystąpił błąd podczas pobierania sklepów.');
    });
});

/*
describe('Testy endpointu "/api/product/"', () => {
  it('Powinien zwrócić informacje o produkcie z kodem 200, jeśli produkt istnieje', async () => {
    const mockProductId = 1;
    const mockShopId = 1;

    const response = await request(app).get(`/api/product/${mockProductId}/${mockShopId}`);
    
    expect(response.status).toBe(200);
  });
});
*/