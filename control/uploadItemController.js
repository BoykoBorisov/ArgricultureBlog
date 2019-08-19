const Item = require("../utils/items");
const path = require("path");

module.exports = (req,res) =>{
  if(!req.session.username)
    res.redirect("/login")
  else
  {
      Item.create({productType : req.body.productType,
                  publisher : req.session.username,                 
                  price : (parseFloat((req.body.price).replace(",","."))),
                  amount: (parseFloat((req.body.amount ).replace(",","."))),
                  availability : true}, (error, item) =>{
                    if(error)
                    {
                      console.log(error);                     
                      res.redirect("/err")
                    }
                    else
                      res.redirect("/items") 
                  });
  }
}