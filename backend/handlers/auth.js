const mongodb = require("mongoose")
const userSchema = require("../schemas/users")
module.exports = auth = async (req, res) => {
    const { name, email, user, password } = req.body
    const User = new userSchema({
        name: name,
        email: email,
        user: user,
        password: password
    })
    await User.save()
}