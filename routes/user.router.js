const
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..', 'controllers'));


router.post("/create-post", userController.createPost);
router.get("/posts", userController.getAllPosts);
router.post("/updatepost", userController.updatepost);
router.post("/deletePost", userController.deletepost);
router.post("/createComment", userController.createcomment);
router.post("/updateComment", userController.updatecomment);
router.post("/deleteComment", userController.deletecomment);


module.exports = router;