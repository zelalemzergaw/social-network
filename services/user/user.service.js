const
    path = require('path'),
    fs = require('fs'),
    util = require('util'),
    stopWordPath = path.join(__dirname, '..', '..', 'resources/stop-words/stopWords.json'),
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

function getUserById(id) {
    return User.findById({ _id: id });
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
    updateCommentGet,
    getUserById,
    getSearchResults
}