const { Schema, model } = require('mongoose')

const ProductSchema = new Schema({
    title: {
        type: String,
    },
})


module.exports = model('Product', ProductSchema)