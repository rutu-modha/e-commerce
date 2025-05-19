const users = require("../schemas/users")
const { generateToken } = require("./jwts")
const signup = async (req, res) => {
    const { name, email, role, password } = req.body
    const User = new users({
        name: name,
        email: email,
        role: role,
        password: password
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
    const find = await users.findOne({ email: email, password: password })
    if (find) {
        [res.status(200).json({ message: "You have logged in successfully" }), true]
    } else {
        [res.status(400).json({ message: "Invalid credentials" }), false]
    }
}
module.exports = { signup, login }