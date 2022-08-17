const Joi = require('joi');

exports.loginValidation = Joi.object({
    email: Joi.string().email().message({
        'string.alphanum': "The email must be includes only English symbols and numbers",
        'string.email': "Incorect email"
    }),
    password: Joi.string().min(6).max(15).pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')).messages({
        'string.pattern.base': "The password need to be with numbers and English letters",
        'string.min': "The password must be minimum 6 symbols",
        'string.max': "The password must be maxmum 15 symbols"
    }),
})