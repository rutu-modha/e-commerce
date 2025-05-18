const express = require("express")
const cors = require("cors")
const { signup, login } = require("./handlers/auth")
const connect = require("./connect")
const { generateToken, verifyToken } = require("./handlers/jwts")
const checkRole = require("./handlers/checkRole")
const app = express()
require("dotenv").config()
app.use(cors())
app.use(express.json())
connect()
.then(() => {
    console.log("Connected to MongoDB successfully")
})
.catch((err) => {
    console.log(err)
})
app.post("/signup", (req, res) => {
    signup(req, res)
    const token = generateToken(req.body)
    res.json({ token })
})
app.post("/login", (req, res) => {
    const token = req.headers["authorization"].split(" ")[1]
    try {
        const decode = verifyToken(token)
        const resArray = login(req, res)
        if (!decode) {
            res.status(401).json(["Error", "Invalid token"])
        }
        if (resArray[1] === false) {
            res.status(400).json(["Error", "Invalid credentials"])
        }
        else {
            res.status(200).json(["Success", "You have logged in successfully"])
        }
    }
    catch(err){
        res.status(500).json(["Error", "Internal server error"])
        console.log(err)
    }
})
app.post("/products", checkRole("Retailer"),verifyToken, (req, res) => {
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})