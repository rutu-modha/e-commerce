// const multer = require("multer")
// const path = require("path")
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "../../frontend/src/Uploads/")
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
//         cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname))
//     }
// })
// const fileFilter = (req, file, cb) => {
//     const types = /jpeg|jpg|png/
//     const extname = types.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = types.test(file.mimetype)}