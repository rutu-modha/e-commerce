const mongodb = require("mongoose")
const userSchema = new mongodb.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}
module.exports = mongodb.model("users", userSchema)
