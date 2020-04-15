const
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { userService } = require(path.join(__dirname, '..', 'services'));

exports.getUser = async (req, res, next) => {
    try{
        console.log("calling")
        let response = await userService.getUserById(req.params.id);
        console.log(response);
        res.status(response.status).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.updateUser = async (req, res, next) =>{

    await userService.updateUser(req.params.id, req.data);
    res.json({message: "successfully updated"});
}

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
exports.searchposts = (req, res, next) => {
    let results = userService.getSearchResults(req.userId, req.body);
    res.json({ searchResult: result });

}

exports.followuser=(req, res, next) => {
    console.log(req.params.uid);
    userService.followUser(req.params.uid);
    res.json({ message: "Successful following" })
}

exports.unFollowuser=(req, res, next) => {
    userService.unFollowerUser(req.params.uid);
    return res.json({ message: "Successfully unfollowed" })
}

exports.getAllPosts = (req, res, next) => {
    // res.json(await userService.updateUserAdvt());

}

exports.getFollowers = (req,res,next) => {
    try{
        
        let result = userService.getFollowers(req.params.userId)
       return res.json({data:result})

    } catch(err){
        return res.json({error: err})
    }
    
    }

exports.getFollowing = (req,res,next) => {
    try{

        let result =    userService.getFollowing(req.params.id)
        return res.json({data:result})

    } catch(err){
        return res.json({error: err})
    }
    
   
        }