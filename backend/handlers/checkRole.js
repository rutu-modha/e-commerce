module.exports = checkRole = (role) => {
    return (req, res, next) => {
        if (req.body.role !== role){
            return res.status(403).json(["Error", "Access denied"])
        }
        next()
    }
}