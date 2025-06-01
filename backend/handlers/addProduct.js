const { productSchema } = require("../schemas/products")
require("dotenv").config
module.exports = addProduct = async (req, res) => {
    const { name, price, description } = req.body
    const imageURL = req.file.filename
    const Product = new productSchema({
        name: name,
        price: price,
        description: description,
        image: `${process.env.REACT_APP_BACKEND_URL}/images/${imageURL}`
    })
    await Product.save()
    res.status(201).json(["Success", "Product added successfully"])
}