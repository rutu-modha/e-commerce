const mongodb = require("mongoose")
module.exports = connect = (dbname) => { 
    return mongodb.connect(`mongodb://localhost:27017/${dbname}`) 
}