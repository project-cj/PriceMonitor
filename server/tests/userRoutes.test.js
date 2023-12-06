const request = require('supertest');
const app = require('../test_server');
require("dotenv").config();
const sequelize = require('../db.js');
const initModels = require('../models2/init-models.js');
const models = initModels(sequelize);
const {validate, validatePassword} = require("../controllers/userController.js");
const bcrypt = require("bcrypt");

let server;

beforeAll(() => {
    server = app.listen(8083);
});
  
afterAll((done) => {
    server.close(done);
});

describe('Testy endpointu "/api/users/"', () => {

    it('Dodanie nowego użytkownika zakończone powodzeniem', async () => {
        const newUser = {
            email: 'test@example.com',
            password: 'Haslo.123',
            alias: 'alias',
            password_repeat: 'Haslo.123'
        };

        const res = await request(app).post('/api/users/').send(newUser);
  
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Użytkownik zarejestrowany pomyślnie');
    
    })
    
    it('Zmiana aliasu udana, dane zostały zmienione request zwrócił kod 200', async () => {
        const user = await models.user.findOne({ where: { alias: 'alias'}})
        const userId =user.id;
        const newAlias = 'newAlias';
    
        const res = await request(app).post('/api/users/changeAlias').send({ alias: newAlias, id: userId });
    
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Pseudonim został pomyślnie zmieniony');
    });
    
    it('Zmiana aliasu nieudana, pusty request powinno zwrócić błąd', async () => {
        const res = await request(app).post('/api/users/changeAlias').send({ alias: '' });
    
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Nie podano nowego pseudonimu');
    });

    it('Zmiana promienia udana', async () => {
        const user = await models.user.findOne({ where: { alias: 'newAlias'}});
        const res = await request(app).post('/api/users/changeRadius').send({radius: 3, id: user.id});
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Promień został pomyślnie zmieniony');
    })

    it('Zmiana promienia nieudana - brak promienia w body', async () => {
        const user = await models.user.findOne({ where: { alias: 'newAlias'}});
        const res = await request(app).post('/api/users/changeRadius').send({radius: null, id: user.id});
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Nie podano nowego promienia');
    })


    it('Zmiana lokalizacji udana', async () => {
        const user = await models.user.findOne({ where: { alias: 'newAlias'}});
        const res = await request(app).post('/api/users/changeLocation').send({x_loc: 52.20, y_loc: 22.30, id: user.id});
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('message', 'Lokalizacja została pomyślnie zmieniona');
    })

    it('Zmiana lokalizacji nieudana - brak danych', async () => {
        const user = await models.user.findOne({ where: { alias: 'newAlias'}});
        const res = await request(app).post('/api/users/changeLocation').send({x_loc: null, y_loc: null, id: user.id});
        
        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('message', 'Nie podano nowej lokalizacji');
    })
    
    it('Zmiana aliasu nieudana, podany alias jest w użytku', async () => {
        const existingAlias = 'newAlias';

        const res = await request(app).post('/api/users/changeAlias').send({ id: 1,alias: existingAlias });
    
        const user = await models.user.findOne({ where: { alias: existingAlias}})
        await user.destroy()
        
        expect(res.statusCode).toEqual(409);
        expect(res.body).toHaveProperty('message', 'Pseudonim jest w użyciu');
    });

    it('Zmiana pseudonimu nieudana - błąd serwera', async () => {
        sequelize.close();
        const res = await request(app).post('/api/users/changeAlias').send({ alias: 'someAlias', id: 1 });
    
        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('message', 'Błąd serwera');
    });


    it('Zmiana lokalizacji nieudana - błąd serwera', async () => {
        const res = await request(app).post('/api/users/changeLocation').send({x_loc: 52.20, y_loc: 22.30, id: 10});
        
        expect(res.status).toEqual(500);
        expect(res.body).toHaveProperty('message', 'Nie podano nowej lokalizacji');
    });   

});