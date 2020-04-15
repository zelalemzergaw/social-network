const
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "..", "util")),
    { Ad, User, Post } = require(path.join(__dirname, '..', '..', 'models')),
    { filterService } = require(path.join(__dirname, '..', 'shared'));

function publishAd() {

}

function editAd() {

}

function deleteAd() {

}

function addBadWord(bWord) {
    try {
        let result = filterService.addNewBadWord(bWord);
        return new ApiResponse(200, "success", result);
    } catch (error) {
        console.log("FROM SERVICE.......", err);
    }

}

async function getBadWords() {
    try {
        let result = await filterService.getBadWordList();
        return new ApiResponse(200, "success", result);
    } catch (err) {
        console.log("FROM SERVICE.......", err);
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
    try {
        let result = filterService.updateBadWordList(withThisList);
        return new ApiResponse(200, "success", result);
    } catch (err) {
        console.log("FROM SERVICE.......", err);
    }

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
async function addAdvertisement(id, advData) {

    const advertisement = new Ad({
        text: advData.text,
        link: advData.link,
        postby: advData.postby,
        datepublished: advData.datepublished,
        targetedUser: advData.age,
        targetedUser: advData.location
    });

    let ad_ = await advertisement.save();

    await userService.updateUser(id, { adId: ad_._id });


}

async function editAdvertisement(dataUpdate) {

    await Ad.updateOne({ _id: dataUpdate._id }, {
        $set: {
            text: dataUpdate.text,
            link: dataUpdate.link,
            postby: dataUpdate.postby,
            datepublished: dataUpdate.datepublished,
            targetedUser: dataUpdate.age,
            targetedUser: dataUpdate.location

        }
    });


}

async function getAdvertisement(id) {
    return await Ad.findById({ _id: id });

}
async function deleteAd(id) {
    console.log(id);
    await Ad.findByIdAndRemove({ _id: id });

}

module.exports = {
    publishAd,
    editAd,
    deleteAd,
    addBadWord,
    getBadWords,
    removeBadWord,
    updateBadWordList,
    addAdvertisement,
    getAdvertisement,
    editAdvertisement,
    deleteAd

}