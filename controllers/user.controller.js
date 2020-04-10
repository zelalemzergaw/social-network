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
    console.log("test create post", req.params.p_Id);
    res.json(await userService.updatePostGet(req.params.p_Id));
    // res.send('succesfully added');


}
exports.updatepost = async(req, res, next) => {
    // userService.updatepost(req.userId, req.body);
    //console.log("test2");
    await userService.updatePost(req.body);
    res.json({ message: "successfully updated" });

}
exports.deletepost = async(req, res, next) => {
    //userService.createPost(req.userId, req.body);
    // console.log("test3");
    await userService.deletePost(req.params.d_id);
    res.json({ message: "successfully deleted" });

}
exports.createcomment = async(req, res, next) => {
    await userService.createComment(req.params.c_Id, req.userId, req.body);
    // console.log("comment  uplading ....");
    console.log(req.userId, req.postId, req.body);
    res.json({ message: "comment uploaded successfully" });

}
exports.updatecomment = async(req, res, next) => {
    console.log("test create post", req.params.p_id);

    await userService.updateComment(req.body);
    res.json({ message: "comment successfully updated" });



}
exports.updatecommentget = async(req, res, next) => {
    res.json(await userService.updateCommentGet(req.params.p_Id));
    console.log("test create post", req.params.p_id);

}
exports.deletecomment = async(req, res, next) => {

    await userService.deleteComment(req.params.d_cid);
    res.json({ message: "comment successfully deleted" });

    console.log("test3");

}