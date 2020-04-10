const
    path = require('path'),
    router = require('express').Router(),
    { userController } = require(path.join(__dirname, '..', 'controllers'));


router.post("/create-post", userController.createPost);
router.get("/posts", userController.getAll);
router.get("/posts/:p_id", userController.updatepostget);
router.post("/updatepost", userController.updatepost);
router.post("/deletePost/:d_id", userController.deletepost);
router.post("/createComment/:c_Id", userController.createcomment);
router.post("/updateComment", userController.updatecomment);
router.post("/deleteComment", userController.deletecomment);


module.exports = router;