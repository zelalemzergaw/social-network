const fs = require('fs'),
    path = require('path'),
    util = require('util'),
    { filterService } = require(path.join(__dirname, '..', 'shared'));
/**
 * Checks a word to be a bad word 
 * @param {a word to be checked if is bad word} word 
 */
async function isBadWord(word) {
    let badWordList =await filterService.getBadWordList();
    return badWordList.includes(word);
}
/**
 * Validates if user's post qualifies to be posted 
 * @param {User's text post} post 
 */
function notSafeForPost(post) {
    let ret = false;
    let listOfPostWords = post.split(' ');
    listOfPostWords.some((value, index, _arr) => {
        if (isBadWord(value)) {
            ret = true;
            return true;
        }
    });
    return ret;
}
module.exports = {
    isBadWord,
    notSafeForPost
}