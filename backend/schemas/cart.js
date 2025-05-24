const { productSchema } = require("../schemas/products")
const mongodb = require("mongoose")
const cartSchema = new mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    cartItem: [productSchema]
})
module.exports = mongodb.model("cart", cartSchema)