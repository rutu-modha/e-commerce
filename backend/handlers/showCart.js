const cart = require("../schemas/cart")
module.exports = showCart = async (req, res) => {
    const name = req.headers["name"]
    const result = await cart.find({ 
        name: name 
    })
    res.json(result)
}