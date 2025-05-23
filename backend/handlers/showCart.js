const cart = require("../schemas/cart")
module.exports = showCart = async (req, res) => {
    const result = await cart.find()
    res.json(result)
}