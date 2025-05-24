const cart = require("../schemas/cart")
module.exports = addToCart = async (req, res) => {
    const cartItem = req.body.cartItem
    const name = req.user.name
    const Cart = new cart({
        name: name,
        cartItem: cartItem
    })
    await Cart.save()
    res.send(["Success", "Product added to the cart successfully"])
} 