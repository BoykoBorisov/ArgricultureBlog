module.exports = (req, res) => {
    if (req.session.userId)
      return res.redirect('/');
    else
      res.render('signup')
}