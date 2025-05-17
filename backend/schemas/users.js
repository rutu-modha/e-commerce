const mongodb = require("mongoose")
usersSchema = new mongodb.Schema({
    name: String,
    email: String,
    user: String,
    password: String
})
module.exports = mongodb.model("users", usersSchema)
