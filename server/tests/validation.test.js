const {validate, validatePassword} = require("../controllers/userController.js")
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

describe('Funkncja walidacji danych do rejestracji', () => {
    it('Pomyślna walidacja z poprawnymi danymi', () => {
        const data = {
            email: 'test@example.com',
            alias: 'test_alias',
            password: 'Test123!@#',
            password_repeat: 'Test123!@#',
        };

        const result = validate(data);
        expect(result.error).toBeFalsy();
    });
});

describe('Funkncja walidacji danych do zmiany hasła', () => {
    it('Pomyślna walidacja z poprawnymi danymi', () => {
        const data = {
            id: 1,
            oldPassword: 'Test123!@#',
            newPassword: 'Haslo.123',
            repPassword: 'Haslo.123',
        };

        const result = validatePassword(data);
        expect(result.error).toBeFalsy();
    });
});