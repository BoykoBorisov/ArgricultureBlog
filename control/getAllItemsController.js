const Item = require("../utils/items");
module.exports = async(req,res) => {
  var items = await Item.find({availability : true});
  res.render("items", {items});  
}