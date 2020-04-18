const
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "..", "util")),
    fs = require('fs'),
    util = require('util'),
    stopWordPath = path.join(__dirname, '..', '..', 'resources/stop-words/stopWords.json'),
    { User, Post, Ad } = require(path.join(__dirname, '..', '..', 'models')),
    notificationService = require('../notification'),
    systemService = require("../system");



async function getAllPosts() {
    return await Post.find();
    //console.log("test1"); 

}
async function createPost(userId, data, app) {
    const post = new Post({
        title: "Post",
        description: data.description,
        images: data.images,
        postedBy: userId,

    });
    let result;
    let review = await systemService.notSafeForPost(data.description);
    console.log("REVIEW RESULT", review);
    // if(review) {
    //     post.status = "onhold";
    //     result = await post.save();
    //     await notificationService.badPostNotification(userId, result, app);

    // }else {
    //     result = await post.save();
    //     await notificationService.newPostNotification(userId, result, app);

    // }
    result = await post.save();
    await notificationService.newPostNotification(userId, result, app);



    return new ApiResponse(200, "success", result);
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


async function addComment(id, postId, data, app) {
    await Post.updateOne({ _id: postId }, {
        $push: {
            comments: {
                text: data.text,
                commentedBy: id
            }
        }
    });

    await notificationService.commentNotification(id, postId, app);
    return new ApiResponse(200, "success", {});

}

async function likePost(id, postId, data, app) {

    await Post.updateOne({ _id: postId }, {
        $push: {
            likes: {
                likedBy: id
            }
        }
    });
    await notificationService.likeNotification(id, postId, app);
    return new ApiResponse(200, "success", {});

}

async function unLikePost(id, postId) {
    console.log("UNLIKE")
    await Post.updateOne({ _id: postId }, {
        $pull: {
            likes: {
                likedBy: id
            }
        }
    });
    return new ApiResponse(200, "success", {});

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


async function changeProfilePic(id, pic) {
    await User.updateOne({ _id: id }, { photo: pic });
    return new ApiResponse(200, 'success', {});
}

async function updateUser(id, data) {
    await User.updateOne({ _id: id }, {
        $set: {
            firstname: data.firstname,
            lastname: data.lastname,
            birthday: data.birthday,
            location: data.location,
            email: data.email
        }

    });
    return new ApiResponse(200, 'success', {});

}
async function getUserById(id) {
    let result = await User.findById({ _id: id });
    return new ApiResponse(200, "success", result);
}

async function getAllUsers() {
    let result = await User.find();
    return new ApiResponse(200, "success", result);
}

/**
 * Reads stop words from file
 */
async function getStopWords() {
    const readFile = util.promisify(fs.readFile);
    const list = await readFile(stopWordPath, 'utf-8');
    return JSON.parse(list);
}
/**
 * This function parses the input string into array of search keys 
 * @param {a plain string input typed in by the user} str 
 */
function phraseParser(str) {
    let formattedForSearch = str.replace(/\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-z\s]+/gi, '').replace(/\s+$/, '');
    let wordByWord = formattedForSearch.split(/\s/);
    let keyWords = [];
    let stopWords;
    getStopWords().then(stopWordJSON => {
        stopWords = stopWordJSON.stopwords;
    }).catch(err => console.log(err))
    wordByWord.forEach(eachKey => {
        if (stopWords.indexOf(eachKey) === -1) {
            keyWords.push(eachKey);
        }

    });
    return keyWords;
}
/**
 *  prepares the query (the $regex) query 
 * @param {list of parsed key words entered by the user} keyWords 
 * @param {list of usersId that the users follows} listOfFollowingId 
 */
function queryMaker(keyWords, listOfFollowingId) {

    let regexQuery = { '$and': [] };
    keyWords.forEach(keyWord => {
        let queryPerKeyWord = { description: { '$regex': keyWord, '$options': 'i' } }
        queries['$and'].push(queryPerKeyWord);
    });
    let finalQuery = { '$and': [{ '$and': queries }, { '_id': { '$in': listOfFollowingId } }] };
    return finalQuery;
}
/**
 * 
 * @param {is the id of the user who is making the search} this_User_id 
 * @param {is string typed into the search bar} search_Phrase 
 */
function getSearchResults(this_User_id, search_Phrase) {
    let listOfFollowingId = User.findById(this_User_id).following;
    let str = phraseParser(search_Phrase);
    return Post.find(queryMaker(str, listOfFollowingId, { description: 1, postedBy: 1 }))
        .populate('postedBy')
        .execPopuate();
}
async function updateUserAdvt(id, update) {
    console.log(id, update, 'id print');
    await User.updateOne({ _id: id }, { advetisements: { $push: update } });

}

/**
 * 
 * @param {is the id of the user who is making the followers and Following} this_User_id 
 * @param {is action click into the follow button} 
 */


async function getFollowers(id) {
    let user = await User.findById({ _id: id });
    let followers = user.followers.map(f => f.followerID);
    let myFollowers = await User.find({ _id: { $in: followers } });

    return new ApiResponse(200, "success", myFollowers);

}

async function getFollowings(id) {
    console.log("get followings")
    let user = await User.findById({ _id: id });
    let followings = user.following.map(f => f.followerID);
    console.log(user, followings);
    let Myfollowings = await User.find({ _id: { $in: followings } });

    return new ApiResponse(200, "success", Myfollowings);

}
async function followUser(id, uId, app) {
    await User.updateOne({ _id: id }, {
        $addToSet: {
            following: {
                followerID: uId
            }
        }
    })

    await User.updateOne({ _id: uId }, {
        $addToSet: {
            followers: {
                followerID: id

            }
        }
    });
    await notificationService.followNotification(id, uId, app)

    return new ApiResponse(200, "success", {});
}

/**
 * 
 * @param {is the id of the user who is making the followers and unFollow} this_User_id 
 * @param {is action click into the follow button} 
 */


async function unFollowUser(id, uId) {
    let u1 = await User.findById({ _id: id });
    let u2 = await User.findById({ _id: uId });
    let following = u1.following.filter(f => f.followerID != uId);
    let followers = u2.followers.filter(f => f.followerID != id);

    await User.updateOne({ _id: id },
        {
            $set: { following: following }
        });
    await User.updateOne({ _id: uId }, {
        $set: { followers: followers }
    })

    return new ApiResponse(200, "success", {});
}

/**
 * 
 * @param {is the id of the user who is making the get followers } this_User_id 
 * @param {is action click into the follow button} 
 */


    async function _getUser(userId) {
        return await User.findById({ _id: userId });
    }

    async function fetchFeed(userId) {
        let user = await _getUser(userId);
        let followings = user.following;
        followings = followings.map(f => f.followerID);
        followings.push(userId);
        let result = await Post.find({ postedBy: { $in: followings } })
            .populate("postedBy")
            .populate("comments.commentedBy")
            .sort({ createdAt: "desc" });
        return new ApiResponse(200, "success", result);
    }

    async function getPosts(userId) {
        let result = await Post.find({ postedBy: userId })
            .populate("comments.commentedBy")
            .sort({ createdAt: "desc" });
        return new ApiResponse(200, "success", result);
    }





async function _getUserById(id) {
    return await User.findById({_id:id});
}

module.exports = {
    createPost,
    updatePost,
    deletePost,
    addComment,
    likePost,
    unLikePost,
    updateComment,
    deleteComment,
    followUser,
    getPost,
    getAllPosts,
    updatePostGet,
    updateCommentGet,
    getUserById,
    getSearchResults,
    updateUserAdvt,
    unFollowUser,
    _getUserById,
    getAllUsers,
    getFollowers,
    getFollowings,
    changeProfilePic,
    fetchFeed,
    getPosts,
    updateUser

}