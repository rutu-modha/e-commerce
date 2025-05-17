const express = require("express")
const cors = require("cors")
const auth = require("./handlers/auth")
const connect = require("./connect")
const app = express()
app.use(express.json())
app.use(cors())
connect("ecommerce")
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