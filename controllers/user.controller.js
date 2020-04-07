const
      path = require('path'), 
     { userService } = require(path.join(__dirname, '..', 'services'));

exports.createPost = (req, res, next) => {
    //userService.createPost(req.userId, req.body);

}

exports.getAllPosts = (req, res, next) => {
    console.log(req.userId);
    res.json([{titile: "post one", description: "hello this is my first post"}]);
}

