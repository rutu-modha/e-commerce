const bcrypt = require("bcrypt")
const users = require("../schemas/users")
const { generateToken } = require("./jwts")
const signup = async (req, res) => {
    const salt = 10
    const { name, email, role, password } = req.body
    try{
        hashed = await bcrypt.hash(password, salt)
    } catch (error) {
        res.status(500).json({ message: "Error hashing password" })
    }
    const User = new users({
        name: name,
        email: email,
        role: role,
        password: hashed
    })
    const find = await users.findOne({ email: email })
    if (find) {
        return res.status(400).json({ message: `User with email ${email} already exists` })
    } else {
        await User.save()
        const token = generateToken(req.body)
        res.status(200).json({
            message: "You have signed up successfully", 
            token: token 
        })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    const user = await users.findOne({ email: email })
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        [res.status(200).json({ message: "You have logged in successfully" }), true]
    } else {
        [res.status(400).json({ message: "Invalid credentials" }), false]
    }
}
module.exports = { signup, login }