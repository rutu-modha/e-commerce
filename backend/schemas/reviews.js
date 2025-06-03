const mongo = require("mongoose")
const reviewSchema = new mongo.Schema({
    name: {
        type: String,
        required: true
    },
    regard: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})
module.exports = mongo.model("reviews", reviewSchema)