const express = require("express")
const cors = require("cors")
const auth = require("./handlers/auth")
const connect = require("./connect")
const jwt = require("jsonwebtoken")
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
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})