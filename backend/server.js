const express = require("express")
const cors = require("cors")
const path = require("path")
const rateLimit = require("express-rate-limit")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const helmet = require("helmet") 
const xss = require("xss-clean")
const { body, validationResult } = require("express-validator")
const sanitize = require("express-mongo-sanitize")
const compress = require("compression")
const { signup, login } = require("./handlers/auth")
const connect = require("./connect")
const { generateToken, verifyToken } = require("./handlers/jwts")
const checkRole = require("./handlers/checkRole")
const upload = require("./handlers/upload")
const addProduct = require("./handlers/addProduct")
const listProducts = require("./handlers/listProducts")
const addToCart = require("./handlers/addToCart")
const showCart = require("./handlers/showCart")
const app = express()
require("dotenv").config()
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "handlers", "images")))
// app.use(rateLimit({
//     windowMs: 120 * 60 * 1000,
//     max: 10, 
//     message: "Too many requests from this IP, please try again later"
// }))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet())
//app.use(xss())
app.use(sanitize())
app.use(compress())
connect("ecommerce")
.then(() => {
    console.log("Connected to MongoDB successfully")
})
.catch((err) => {
    console.log(err)
})
app.post("/signup", [body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    body("role").notEmpty().withMessage("Role is required")
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    await signup(req, res)
})
app.post("/login", async (req, res) => {
    await login(req, res)
})
app.post("/products", verifyToken, checkRole("Retailer"), upload.single("image"), async (req, res) => {
    await addProduct(req, res)
})
app.get("/products", async (req, res) => {
    await listProducts(req, res)
})
app.post("/cart", verifyToken, async (req, res) => {
    await addToCart(req, res)
})
app.get("/cart", verifyToken, async (req, res) => {
    await showCart(req, res)
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})