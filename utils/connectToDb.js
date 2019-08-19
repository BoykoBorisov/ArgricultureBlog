const databasePass = require("./databasePass.js");

//for mongodb connection
const MongoClient = require("mongoose");
const uri = `mongodb+srv://catts:${databasePass.databasePass}@cluster0-rvbc4.gcp.mongodb.net/test?retryWrites=true&w=majority`;

MongoClient.connect(uri, {useNewUrlParser : true}).then(
  () => {console.log("Connection established");},
  err => {console.log("Error because of: ", err);}
)

require('./posts');