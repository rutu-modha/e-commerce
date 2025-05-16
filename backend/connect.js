module.exports = connect = (dbname) => {
    const mongodb = require("mongoose")
    mongodb.connect(`mongodb://localhost:27017/${dbname}`)
    .then(() => {
        return "Connected to MongoDB successfully"
    })
    .catch((err) => {
        return err
    })
}