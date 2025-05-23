const products = require("../schemas/products")
module.exports = listProducts = async (req, res) => {
    const result = await products.find()
    res.status(200).json(result)
}