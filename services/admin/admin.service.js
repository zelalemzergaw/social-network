const
    path = require('path'),
    { Ad, User, Post } = require(path.join(__dirname, '..', '..', 'models')),
    filterService = require(path.join(__dirname, '..', 'shared'));

function publishAd() {

}

function editAd() {

}

function deleteAd() {

}

function addBadWord(bWord) {
    filterService.addBadWordToList();
}

function getBadWords() {
    console.log("working...")
    try {
        console.log(filterService.getBadWordList(), "FFFFF")
        return filterService.getBadWordList();

    } catch (err) {
        console.log(err);
    }
}

function removeBadWord(thisBadWord) {
    filterService.removeBadWord(thisBadWord);
}
/**
 * Update Bad words list 
 * @param {a complete JSON object of bad-words coming from the admin to replace existing one/ mass update} withThisList 
 */
function updateBadWordList(withThisList) {
    filterService.updateBadWordList(withThisList);
}
/**
 * A function to review a post to be used by admin 
 * @param {a boolean indicating the decision of the admin} postIsOkay 
 * @param {Id of a user specific to the post} userId 
 * @param {Id of the current post under review } postId 
 */
function reviewPost(postIsOkay, userId, postId) {
    let post = Post.findById(postId);
    if (postIsOkay) {

        post.status = 'okay';
        post.save();
    } else {

        let user = User.findById(userId);
        user.badPostCount += 1;
        post.status = 'blocked'; //the system can be notified if to block the user 
    }

}
/**
 * function to activate a deactive account
 * @param {Id of a user whose account will be acivated} userId 
 */
function activateAnAccount(userId) {
    let user = User.findById(userId);
    if (user.status === 'deactivated') {
        user.status = 'active';
    }

}

module.exports = {
    publishAd,
    editAd,
    deleteAd,
    addBadWord,
    getBadWords,
    removeBadWord,
    updateBadWordList

}