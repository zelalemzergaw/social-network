const
    path = require('path'),
    { User, Post, Ad } = require(path.join(__dirname, '..', '..', 'models'));



function getAllPosts() {
    return Post.find();
    //console.log("test1");

}
async function createPost(userId, data) {

    //const photopost = await user
    const post = new Post({
        title: data.title,
        description: data.description,
        images: data.image,
        postedBy: userId,

    });
    await post.save();
}

async function updatePostGet(id) {
    return Post.findById(_id);
}

async function updatePost(pId, data) {
    //console.log('update working......');
    // const post = await Post.findById({ postId: _id });
    await Post.updateOne({ _id: pId }, {
        $set: { tetle: data.title, description: data.description, images: data.image }

        // description: data.description,
        // image: data.image

    });


}

function deletePost() {

}

function getPost(p_id) {
    return Post.findById(p_id);
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




module.exports = {
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment,
    followUser,
    getPost,
    getAllPosts,
    updatePostGet
}