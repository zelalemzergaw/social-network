const
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..', 'controllers'));;

router.post("create-post", userController.createPost);
router.get("/posts", userController.getAllPosts);
router.post("/updatepost", userController.getAllPosts);
router.post("/deletePost", userController.getAllPosts);
router.post("/createComment", userController.getAllPosts);
router.post("/updateComment", userController.getAllPosts);
router.post("/deleteComment", userController.getAllPosts);


module.exports = router;