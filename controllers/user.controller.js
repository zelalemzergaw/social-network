const
    path = require('path'),
    { userService } = require(path.join(__dirname, '..', 'services'));
const multer = require('multer');
const upload = multer({ dest: '/uploads/' });
exports.createPost = (req, res, next) => {
    // console.log("test create post");
    userService.createPost(req.userId, req.body);
    res.send('succesfully added');

}

exports.getAllPosts = (req, res, next) => {
    //console.log(req.userId);
    //res.json([{ titile: "post one", description: "hello this is my first post" }]);
    console.log("test1");

}
exports.updatepost = (req, res, next) => {
    //userService.createPost(req.userId, req.body);
    console.log("test2");

}
exports.deletepost = (req, res, next) => {
    //userService.createPost(req.userId, req.body);
    console.log("test3");

}
exports.createcomment = (req, res, next) => {
    //userService.createPost(req.userId, req.body);
    console.log("test3");

}
exports.updatecomment = (req, res, next) => {
    //userService.createPost(req.userId, req.body);
    console.log("test3");

}
exports.deletecomment = (req, res, next) => {
    //userService.createPost(req.userId, req.body);
    console.log("test3");

}