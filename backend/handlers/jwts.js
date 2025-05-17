const jwt = require("jsonwebtoken")
require("dotenv").config()
const generateToken = (user) => {
    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET)
    return token
}
const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded
    } catch (error) {
        return null
    }
}
module.exports = { generateToken, verifyToken }