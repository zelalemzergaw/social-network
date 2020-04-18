const fs = require('fs'),
    path = require('path'),
    util = require('util'),
    { filterService } = require(path.join(__dirname, '..', 'shared')),
    Post = require('../../models/post.model');
// { Post } = path.join(__dirname, '..', '..', 'models');
/**
 * Checks a word to be a bad word 
 * @param {a word to be checked if is bad word} word 
 */

async function isBadWord(word) {
    let badWordList = await filterService.getBadWordList();
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

async function phraseParser(str) {
    let formattedForSearch = str.replace(/\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-z\s]+/gi, '').replace(/\s+$/, '');
    let stopWords = await filterService.getStopWords();
    let wordByWord = formattedForSearch.split(/\s/);
    let keyWords = [];
    wordByWord
        .forEach(eachKey => {
            if (stopWords.indexOf(eachKey) === -1) {
                keyWords.push(eachKey);
            }

        });
    return keyWords;
}

async function getQueryForThisSearch(keyWords) {
    let queries = { '$or': [] };
    keyWords.forEach(keyWord => {
        let queryPerKeyWord = { description: { '$regex': keyWord, '$options': 'i' } }
        queries['$or'].push(queryPerKeyWord);
    });
    return queries;

}

async function getSearchResults(searchThis) {
    let keywords = await phraseParser(searchThis);
    let queries = await getQueryForThisSearch(keywords);
    let results = await Post.find(queries);
    return results;
}






module.exports = {
    isBadWord,
    notSafeForPost,
    getSearchResults,

}