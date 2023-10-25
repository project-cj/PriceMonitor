const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

function validate(data){
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        alias: Joi.required().label("Alias"),
        password: passwordComplexity().required().label("Hasło"),
        password_repeat: passwordComplexity().required().valid(Joi.ref('password')).label("Hasła nie są identyczne")
    })
    return schema.validate(data)
}

function validatePassword(data){
    const schema = Joi.object({
        id: Joi.required(),
        oldPassword: passwordComplexity().required().label("Hasło"),
        newPassword: passwordComplexity().required().label("Hasło"),
        repPassword: passwordComplexity().required().valid(Joi.ref('newPassword')).label("Nowe hasła nie są identyczne")
    })
    return schema.validate(data)
}


module.exports = {validate, validatePassword}
