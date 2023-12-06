const request = require('supertest');
const app = require('../test_server');
require("dotenv").config();
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
const models = initModels(sequelize);

let server;

beforeAll(() => {
  server = app.listen(8082);
});

afterAll((done) => {
  server.close(done);
});


describe('Testy dla endpointów "/api/shop/"', () => {

  it('Powinien zwrócić listę sklepów z kodem 200', async () => {
    const response = await request(app).get('/api/shop/');
    const shopsFromDatabase = await models.shop.findAll();

    expect(response.status).toBe(200);
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(shopsFromDatabase));
  });

  it('Powinien zwrócić pojedynczy sklep z kodem 200', async () => {
    const existingShopId = 1;
    const response = await request(app).get(`/api/shop/shop/${existingShopId}`);
    const shopFromDatabase = await models.shop.findByPk(existingShopId);

    expect(response.status).toBe(200);
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(shopFromDatabase));
  });

  it('Powinien obsłużyć błąd podczas pobierania listy sklepów i zwrócić kod 500', async () => {
    sequelize.close();
    const response = await request(app).get('/api/shop/');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Wystąpił błąd podczas pobierania sklepów.');
  });

  it('Powinien obsłużyć błąd podczas pobierania pojedynczego sklepu i zwrócić kod 500', async () => {
    const nonExistingShopId = 999;
    const response = await request(app).get(`/api/shop/shop/${nonExistingShopId}`);

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Wystąpił błąd podczas pobierania sklepu.');
  });
});