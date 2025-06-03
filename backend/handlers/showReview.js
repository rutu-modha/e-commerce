const reviewSchema = require("../schemas/reviews")
module.exports = showReview = async(req, res) => {
    const comments = await reviewSchema.find()
    res.json(comments)
}