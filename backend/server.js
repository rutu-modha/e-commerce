const express = require("express")
const cors = require("cors")
const auth = require("./handlers/auth")
const connect = require("./connect")
const app = express()
app.use(cors())
const connect = connect("ecommerce")
app.post("/signup", (req, res) => {
    auth(req, res)
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000")
})
