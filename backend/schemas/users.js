const mongodb = require("mongoose")
module.exports = new mongodb.Schema({
    name: String,
    email: String,
    user: String,
    password: String
})