const User = require("../utils/user");
const bcrypt = require("bcrypt")
module.exports = (req,res) => {
    var{
        email,
        password
} = req.body;
User.findOne({email : email}, (error, user) =>
{   
    if(user)
    {
      bcrypt.compare(password, user.password, (error, same) => {
        if(same)
        {
//          req.session.userId = user._id;
          req.session.email = user.email;
          req.session.username = user.username;
          req.session.status = user.status;
          
          if(user.status == 1)
            res.redirect("/upload");
          else         
            res.redirect("/store");
        }
        else
          res.redirect("/login")
      })
    }
    else
      res.redirect("/login")
});
}
