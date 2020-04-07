const 
    path = require('path'),
    { User, Post, Ad } = require(path.join(__dirname, '..', '..', 'models'));

function createPost(userId, data) {

}

function  updatePost() {
    
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
    return User.findOne({_id:id});
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    followUser
}





