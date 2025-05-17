const express = require("express")
const cors = require("cors")
const auth = require("./handlers/auth")
const connect = require("./connect")
const { generateToken } = require("./handlers/jwts")
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
    auth(req, res)
    const token = generateToken(req.body)
    res.json({ token })
})
app.post("/login", async (req, res) => {
    const token = req.header["authorization"].split(" ")[1]
    try {
        const decode = verifyToken(token)
        res.send(["Success", "You have logged in successfully"])
    }
    catch(err){
        res.send(err)
    }
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})