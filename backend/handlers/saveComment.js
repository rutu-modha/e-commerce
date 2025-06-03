const reviewSchema = require("../schemas/reviews")
module.exports = saveComment = async (req, res) => {
    try {
        const { regard, comment } = req.body
        const review = new reviewSchema({
            name: req.user.name,
            regard: regard,
            comment: comment
        })
        await review.save()
        res.status(200).json(["Success", "You have commented successfully"])
    } catch(error) {
        res.status(500).json(["Error", "Some Internal Server Error occured. Please try again later"])
    }
}