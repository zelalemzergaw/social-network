const
    path = require('path'),
    { User, Post, Ad } = require(path.join(__dirname, '..', '..', 'models'));



async function getAllPosts() {
    return await Post.find();
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
    return await Post.findById({
        _id: id
    });
}

async function updatePost(data) {
    //console.log('update working......');
    await Post.updateOne({ _id: data._id }, {
        $set: { title: data.title, description: data.description, images: data.image }

    });

}

async function deletePost(pId) {
    await Post.findByIdAndRemove({
        _id: pId

    });
}

async function getPost(p_id) {
    return await Post.findById(p_id);
}


async function createComment(p_id, uId, data) {
    //console.log('update working......');
    await Post.updateOne({ _id: p_id }, {
        $push: {
            comments: {

                text: data.text,
                commentedBy: uId

            }
        }
    });

}

async function updateCommentGet(id) {
    return await Post.findById({
        _id: id
    });
}

async function updateComment(data) {
    await Post.updateOne({ _id: data._id }, {
        // $set: {
        //     comments.$.text: data.text
        // }

    });
}

async function deleteComment(params) {
    await Post.findByIdAndRemove({
        _id: params

    });
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
    updatePostGet,
    updateCommentGet
}