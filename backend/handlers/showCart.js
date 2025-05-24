const cart = require("../schemas/cart")
module.exports = showCart = async (req, res) => {
    const result = await cart.find({ 
        name: req.user.name
    })
    res.json(result)
}