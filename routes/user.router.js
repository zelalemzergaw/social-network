const 
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..','controllers'));;

router.post("create-post", userController.createPost );
router.get("/posts", userController.getAllPosts)

module.exports = router;
