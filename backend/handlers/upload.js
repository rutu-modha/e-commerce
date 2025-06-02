const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "images"))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
    }
})
const fileFilter = (req, file, cb) => {
    const types = [
        "image/jpeg",
        "image/jpg",
        "image/png",
    ]
    if (types.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Invalid file type"), false)
    }
}
module.exports = upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 
    },
    fileFilter: fileFilter
})