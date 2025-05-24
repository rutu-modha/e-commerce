const mongodb = require("mongoose")
const productSchema = new mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})
module.exports = { 
    productModel: mongodb.model("product", productSchema), 
    productSchema: productSchema 
}