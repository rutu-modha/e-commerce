const cart = require("../schemas/cart")
module.exports = addToCart = async (req, res) => {
    const { name, cartItem } = req.body
    const Cart = new cart({
        name: name,
        cartItem: cartItem
    })
    await Cart.save()
    res.send(["Success", "Product added to the cart successfully"])
} 