module.exports = (req, res) => {
    if (req.session.status != 1)
      res.redirect('/');
    else
      res.render("upload");
}