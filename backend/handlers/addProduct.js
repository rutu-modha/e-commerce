const { productSchema } = require("../schemas/products")
module.exports = addProduct = async (req, res) => {
    const { name, price, description } = req.body
    const imageURL = req.file.filename
    const Product = new productSchema({
        name: name,
        price: price,
        description: description,
        image: `http://localhost:5000/images/${imageURL}`
    })
    await Product.save()
    res.status(201).json(["Success", "Product added successfully"])
}