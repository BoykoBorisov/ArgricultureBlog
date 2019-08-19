const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const itemsSchema = new Schema({
  productType : String,
  publisher : String,
  price : Number,
  amount: Number,
  image: String,
  availability : Boolean
});

module.exports = mongoose.model("items", itemsSchema);
