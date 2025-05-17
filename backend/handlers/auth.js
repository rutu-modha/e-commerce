const users = require("../schemas/users")
module.exports = auth = async (req, res) => {
    const { name, email, user, password } = req.body
    const User = new users({
        name: name,
        email: email,
        user: user,
        password: password
    })
    const find = await users.findOne({ email: email })
    if (find) {
        return res.status(400).json({ message: "User already exists" })
    } else{
        await User.save()
        return res.status(200).json({ message: "User created successfully" })
    }
}