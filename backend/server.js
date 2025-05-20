const express = require("express")
const cors = require("cors")
const path = require("path")
const rateLimit = require("express-rate-limit") 
const { signup, login } = require("./handlers/auth")
const connect = require("./connect")
const { verifyToken } = require("./handlers/jwts")
const checkRole = require("./handlers/checkRole")
const upload = require("./handlers/upload")
const addProduct = require("./handlers/addProduct")
const listProducts = require("./handlers/listProducts")
const app = express()
require("dotenv").config()
app.use(cors())
app.use(express.json())
app.use("/images", express.static(path.join(__dirname, "handlers", "images")))
connect("ecommerce")
.then(() => {
    console.log("Connected to MongoDB successfully")
})
.catch((err) => {
    console.log(err)
})
const limiter = rateLimit({
    windowMs: 120 * 60 * 1000,
    max: 10, 
    message: "Too many requests from this IP, please try again later"
})
app.post("/signup", async (req, res) => {
    await signup(req, res)
})
app.post("/login", verifyToken, async (req, res) => {
    await login(req, res)
})
app.post("/products", verifyToken, checkRole("Retailer"), upload.single("image"), async (req, res) => {
    await addProduct(req, res)
})
app.get("/products", async (req, res) => {
    await listProducts(req, res)
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})