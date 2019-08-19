const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectID = mongoose.Schema.Types.ObjectId;
const PostSchema = new Schema({
    title: String,
    author: String,
    content: String,
    date: Date
});

module.exports = mongoose.model("posts", PostSchema);