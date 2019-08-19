const Item = require("../utils/items");

module.exports = async(req,res) => {
  var item = await Item.findById(req.params._id, (err,post) => {
    if (err)
      return res.send(err);
  })
  res.render('buyItem', {item});
}