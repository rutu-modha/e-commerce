const { productModel } = require("../schemas/products")
module.exports = showProduct = async (req, res) => {
    const id = req.params.id
    const product = await productModel.findById(id)
    res.status(200).json(product)
}