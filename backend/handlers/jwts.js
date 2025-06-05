const jwt = require("jsonwebtoken")
require("dotenv").config()
const generateToken = (user) => {
    const token = jwt.sign({ 
        name: user.name, 
        role: user.role,
        email: user.email,
        id: user._id
    }, process.env.JWT_SECRET
    )
    return token
}
const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        res.status(401).json(["Error", "Please login to continue"])
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json(["Error", "Invalid token"])
    }
}
module.exports = { generateToken, verifyToken }