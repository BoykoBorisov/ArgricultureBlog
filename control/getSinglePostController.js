const Post = require("../utils/posts");
module.exports =  async(req,res) => {    
    var post = await Post.findById(req.params._id,  function(err, post) {
      if (err)
        return res.send(err);
      });
      res.render('post', {post});
}