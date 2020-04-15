const
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { userService } = require(path.join(__dirname, '..', 'services'));

exports.getUser = async (req, res, next) => {
    try{
        let response = await userService.getUserById(req.params.id);
        res.status(response.status).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.getAllUsers = async (req, res, next) => {
    try{
        let response = await userService.getAllUsers();
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

exports.createPost = async (req, res, next) => {
    try{
        let response = await userService.createPost(req.userId, req.body);
        res.status(response.status).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
    

}

exports.getAll = async(req, res, next) => {
    res.json(await userService.getAllPosts());
    //res.json([{ titile: "post one", description: "hello this is my first post" }]);


}

exports.updatepostget = async(req, res, next) => {
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
    res.json({ message: "comment uploaded successfully" });

}
exports.updatecomment = async(req, res, next) => {
    console.log("test create post", req.params.p_id);

    await userService.updateComment(req.body);
    res.json({ message: "comment successfully updated" });



}
exports.updatecommentget = async(req, res, next) => {
    res.json(await userService.updateCommentGet(req.params.p_Id));

}
exports.deletecomment = async(req, res, next) => {

    await userService.deleteComment(req.params.d_cid);
    res.json({ message: "comment successfully deleted" });


}
exports.searchposts = (req, res, next) => {
    let results = userService.getSearchResults(req.userId, req.body);
    res.json({ searchResult: result });

}

exports.followUser= async(req, res, next) => {
    try{
        let response = await userService.followUser(req.userId, req.params.uid);
        res.status(response.status).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

exports.fetchFeed =  async(req, res, next) => {
    console.log(req.userId, "IS MY ID");

    try{
        let response = await userService.fetchFeed(req.userId);
        res.status(response.status).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
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
        
        // let result = userService.getFollowers(req.params.userId)
    //    return res.json({data:result})

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