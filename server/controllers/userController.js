const jwt = require("jsonwebtoken")
const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

function validate(data){
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        alias: Joi.required().label("Alias"),
        password: passwordComplexity().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = validate