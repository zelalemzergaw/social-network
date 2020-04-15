const
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..', 'controllers'));

router.get('/feetch-feeds', userController.fetchFeed);
router.post("/create-post",userController.createPost);
router.get("/posts", userController.getPosts);
router.get("/posts/:p_Id", userController.updatepostget);
router.post("/updatepost", userController.updatepost);
router.post("/deletePost/:d_id", userController.deletepost);
router.post("/add-comment/:postId", userController.addComment);
router.post("/like-post/:postId", userController.likePost);
router.post('/unlike-post/:postId', userController.unLikePost)
router.get("/updateComment/:p_Id", userController.updatecommentget);
router.post("/updateComment", userController.updatecomment);
router.post("/deleteComment/:d_cid", userController.deletecomment);
router.post("/search-post", userController.searchposts);
router.post('/:id', userController.updateUser)
router.post("/follow/:uid", userController.followUser );
router.post("/posts", userController.getAllPosts);
router.post("/Unfollow/:uid", userController.unFollowuser );
router.get("following/:id", userController.getFollowing);
router.get("followers/:id", userController.getFollowers);
router.get("/:id", userController.getUser);
router.get("/", userController.getAllUsers);




module.exports = router;