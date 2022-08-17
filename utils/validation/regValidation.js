const Joi = require('joi');

exports.regValidation = Joi.object({
    userName: Joi.string().alphanum().min(3).max(15).messages({
        'string.alphanum': "The username must be includes only English symbols and numbers",
        'string.empty': "The username can not be empty",
        'string.min': "The username must be minimum 3 symbols",
        'string.max': "The username must be maxmum 10 symbols"
    }),
    email: Joi.string().email().message({
        'string.alphanum': "The email must be includes only English symbols and numbers",
        'string.email': "Incorect email"
    }),
    password: Joi.string().min(6).max(15).pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')).messages({
        'string.pattern.base': "The password need to be with numbers and English letters",
        'string.min': "The password must be minimum 6 symbols",
        'string.max': "The password must be maxmum 15 symbols"
    }),
    repeatPass: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': 'Repeat password must match password'
    })
})