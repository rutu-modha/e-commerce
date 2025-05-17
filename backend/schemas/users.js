const mongodb = require("mongoose")
const userSchema = new mongodb.Schema({
    name: String,
    email: String,
    role: String,
    password: String
})
module.exports = mongodb.model("users", userSchema)