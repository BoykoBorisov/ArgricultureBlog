const User = require("./../utils/user");

module.exports = (req,res) => {
    User.create(req.body, (error,user) => {
        if(error)
        {
          console.log(error);
          res.redirect("/signup");       
        }
        else
          res.redirect("/login");
    });
}