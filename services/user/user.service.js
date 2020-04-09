const
    path = require('path'),
    { User, Post, Ad } = require(path.join(__dirname, '..', '..', 'models'));

var express = require('express')
var multer = require('multer')
    // ###########################

// ##################################
// var upload = multer({ dest: 'uploads/' })
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });
// const upload = multer({
//             storage: storage,
//             limits: {
//                 fileSize: 10244 * 1024 * 5
//             },
//             filefilter: filefilter

// });
// const filefilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         cb(null, false)
//     }

async function createPost(userId, data) {

    // const user = await User.findOne({ userId });
    // if (!user) throw "user must loged in";
    // console.log('server test working');
    //const photopost = await user
    const post = new Post({
        title: data.title,
        description: data.description,
        images: data.images,
        postedBy: userId,
        status: data.status

    });
    await post.save();
}

function updatePost() {

}

function deletePost() {

}

function createComment() {

}

function updateComment(params) {

}

function deleteComment(params) {

}

function followUser(params) {

}

function getUserById(id) {
    return User.findOne({ _id: id });
}

function photopost() {
    upload.single('postimg');
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './upload')

        },
        filename: function(req, file, cb) {
            cb(null, new Date().toISOString() + file.originalname);
        }
    });
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 10244 * 1024 * 5
        },

    });
    const filefilter = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false)
        }

    }

}
module.exports = {
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    followUser,
    photopost
}