const reviewSchema = require("../schemas/reviews")
module.exports = showReview = async(req, res) => {
    const { name } = req.query
    const comments = await reviewSchema.find({
        regard: name
    })
    res.json(comments)
}