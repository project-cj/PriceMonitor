const request = require('supertest');
const app = require('../test_server');
require("dotenv").config();
const sequelize = require('../db.js')
const initModels = require('../models2/init-models.js');
var models = initModels(sequelize)

let server;

beforeEach(() => {
  server = app.listen(8081);
});

afterEach((done) => {
  server.close(done);
});

describe('Testy endpointu "/api/shop/"', () => {
    it('Powinien zwrócić listę sklepów z kodem 200', async () => {
      const response = await request(app).get('/api/shop/');
      const shopsFromDatabase = await models.shop.findAll();
  
      expect(response.status).toBe(200);
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(shopsFromDatabase));
    });

    it('Powinien obsłużyć błąd i zwrócić kod 500 w przypadku problemu z pobieraniem sklepów', async () => {
        await sequelize.close();
        const response = await request(app).get('/api/shop/');
    
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Wystąpił błąd podczas pobierania sklepów.');
    });

});