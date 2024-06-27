const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: [{type: String}],
    images: [{type: String}],
    category: {type: String, required: true},
    heroProduct: {type: String, required: true}
})

export const Product = models.Product || model('Product', ProductSchema)