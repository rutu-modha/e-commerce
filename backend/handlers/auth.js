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
    if (find !== null) {
        res.status(400)
            .json(["Error", `User with email ${email} already exists`])
    } else {
        await User.save()
        res.status(200)
            .json(["Success", "You have signed up successfully"])
    }
}
const login = async (req, res) => {
    const user = await users.findOne({ email: req.body.email })
    const match = await bcrypt.compare(req.body.password, user.password)
    const token = generateToken(user)
    if (match) {
        res.status(200).cookie("token", token, {
            maxAge: 3600000,
            httpOnly: true
        }).json(["Success", "You have logged in successfully"])
    } else {
        res.status(400).json(["Error", "Invalid credentials"])
    }
}
module.exports = { signup, login }