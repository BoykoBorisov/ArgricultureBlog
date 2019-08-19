const Post = require("../utils/posts");

module.exports = async(req,res) => { 
    var posts = await Post.find({});
    res.render("articles",{posts});
  }