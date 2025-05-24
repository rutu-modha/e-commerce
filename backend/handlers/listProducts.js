const { productModel } = require("../schemas/products")
module.exports = listProducts = async (req, res) => {
    const result = await productModel.find()
    res.status(200).json(result)
}