const express = require("express")
const cors = require("cors")
const path = require("path")
const app = express()
app.use(cors())
app.use(path.join(express.static(__dirname, "..", "frontend", "public")))
app.get("*", (req, res) => {
    res.sendFile(path.join(express.static(__dirname, "..", "frontend", "public", "index.html")))
})
app.listen(5000, () => {
    console.log("Server is running at http://localhost:3000")
})