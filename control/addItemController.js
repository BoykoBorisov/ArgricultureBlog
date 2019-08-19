module.exports = (req, res) =>{
  if(req.session.status)
    res.render("addItem");
  else
    res.redirect("/");   
}