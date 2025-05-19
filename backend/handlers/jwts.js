const jwt = require("jsonwebtoken")
require("dotenv").config()
const generateToken = (user) => {
    const token = jwt.sign({ 
        name: user.name, 
        role: user.role 
    }, process.env.JWT_SECRET
)
    return token
}
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1]
    if (!token) {
        return res.status(401).json(["Error", "No token provided"])
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json(["Error", "Invalid token"])
    }
}
module.exports = { generateToken, verifyToken }