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

    it('Niepomyślna walidacja danych: nieodpowiedni adres e-mail', () => {
        const data = {
            email: 'example.com',
            alias: 'test_alias',
            password: 'Test123!@#',
            password_repeat: 'Test123!@#',
        };

        const result = validate(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Email');
    });

    it('Niepomyślna walidacja danych: brak aliasu', () => {
        const data = {
            email: 'test@example.com',
            password: 'Test123!@#',
            password_repeat: 'Test123!@#',
        };

        const result = validate(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Alias');
    });

    it('Niepomyślna walidacja danych: nieodpowiednie hasło', () => {
        const data = {
            email: 'test@example.com',
            alias: 'test_alias',
            password: 'Test123',
            password_repeat: 'Test123',
        };

        const result = validate(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Hasło');
    });
    
    it('Niepomyślna walidacja danych: niepoprawne powtórzone hasło', () => {
        const data = {
            email: 'test@example.com',
            alias: 'test_alias',
            password: 'Test123!@#',
            password_repeat: 'Test123!@',
        };

        const result = validate(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Hasła nie są identyczne');
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

    it('Niepomyślna walidacja - stare hasło niezgodne z wytycznymi', () => {
        const data = {
            id: 1,
            oldPassword: 'Test123',
            newPassword: 'Haslo.123',
            repPassword: 'Haslo.123',
        };

        const result = validatePassword(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Hasło');
    });

    it('Niepomyślna walidacja - nowe hasło niezgodne z wytycznymi', () => {
        const data = {
            id: 1,
            oldPassword: 'Test123!@#',
            newPassword: 'Haslo123',
            repPassword: 'Haslo.123',
        };

        const result = validatePassword(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Hasło');
    });

    it('Niepomyślna walidacja - nowe hasło niezgodne z wytycznymi', () => {
        const data = {
            id: 1,
            oldPassword: 'Test123!@#',
            newPassword: 'Haslo.123',
            repPassword: 'Haslo123',
        };

        const result = validatePassword(data);
        expect(result.error).toBeTruthy();
        expect(result.error.details[0].context.label).toBe('Nowe hasła nie są identyczne');
    });
    
    
});