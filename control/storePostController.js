const Post = require("../utils/posts")

module.exports = (req,res) => {
    Post.create(req.body, (error, post) => res.redirect("/"));
}