const cart = require("../schemas/cart")
module.exports = deleteCart = async (req, res) => {
    const { image, name, price, description } = req.body.cartItem[0]
    await cart.findOneAndDelete([{
        image: image,
        name: name,
        price: price,
        description: description
    }])
    res.status(200).json(["Success", "Item removed from cart successfully"])
}