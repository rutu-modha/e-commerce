const mongodb = require("mongoose")
const cartSchema = new mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    cartItem: {
        type: Array,
        required: true,
        default: []
    }
})
module.exports = mongodb.model("cart", cartSchema)