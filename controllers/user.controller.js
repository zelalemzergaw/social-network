const
    path = require('path'),
    { userService } = require(path.join(__dirname, '..', 'services'));

exports.createPost = (req, res, next) => {
    //console.log("test create post");
    userService.createPost(req.userId, req.body);
    res.send('succesfully added');

}

exports.getAll = async(req, res, next) => {
    console.log(req.userId);
    res.json(await userService.getAllPosts());
    //res.json([{ titile: "post one", description: "hello this is my first post" }]);


}

exports.updatepostget = async(req, res, next) => {
    console.log("test create post", req.params.p_id);
    res.json(await userService.updatePostGet(req.params.p_id));
    // res.send('succesfully added');


}
exports.updatepost = async(req, res, next) => {
    // userService.updatepost(req.userId, req.body);
    console.log("test2");
    await userService.updatePost(req.body);
    res.json({ message: "successfully updated" });

}
exports.deletepost = (req, res, next) => {
    //userService.createPost(req.userId, req.body);
    // console.log("test3");


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