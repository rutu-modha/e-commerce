const { productModel } = require("../schemas/products")
module.exports = async (req, res) => {
    const { search } = req.body
    try {
        const products = await productModel.find({
            $or: [{
                name: { 
                    $regex: search, 
                    $options: "i" 
                }}, { 
                description: { 
                    $regex: search, 
                    $options: "i" 
                }
            }]
        })
        res.json(products)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}