const mongodb = require("mongoose")
const userSchema = new mongodb.Schema({
    name: String,
    email: String,
    user: String,
    password: String
})
module.exports = mongodb.model("users", userSchema)