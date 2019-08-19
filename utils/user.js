const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const usersSchema = new Schema({
  email : String,
  username : String,
  password : String,
  status : Number
});

usersSchema.pre('save', function (next) {
    const user = this
 
    bcrypt.hash(user.password, 10, function (error, encrypted) {
        user.password = encrypted;
        user.status = 0;
        next()
    })
})

module.exports = mongoose.model("admin", usersSchema);