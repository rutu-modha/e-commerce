const mongodb = require("mongoose")
module.exports = listProducts = async (req, res) => {
    const products = await mongodb.model("product").find()
    res.status(200).json(products)
}