const fs = require('fs'),
    path = require('path'),
    util = require('util');

module.exports = (() => {
    let listOfBadwords;
    let stopWords;
    const bad_word_path = path.join(__dirname, '..', '..', '/resources/bad_word', 'badWord.json');
    const stop_word_path = path.join(__dirname, '..', '..', 'resources/stop-words/stopWords.json');
    /**
     * fetch all back words
     */
    async function getStopWords() {
        if (stopWords === undefined) {
            const readFile = util.promisify(fs.readFile);
            const list = await readFile(stop_word_path, 'utf-8');
            stopWords = JSON.parse(list);
        }
        return stopWords.stopwords;
    }
    /**
     * gets and returns list of badwords 
     * First time from file and for subsequent requests from memory
     */
    const getBadWordList = async() => {
            if (listOfBadwords === undefined) {
                const readFile = util.promisify(fs.readFile);
                const list = await readFile(bad_word_path, 'utf-8');
                listOfBadwords = JSON.parse(list);
            }
            return listOfBadwords.badwords;
        }
        /**
         * adds new unique bad word 
         * @param {a bad word to be added to list} bWord 
         */
    const addNewBadWord = (bWord) => {
            if (listOfBadwords.badwords.indexOf(bWord) === -1) {
                listOfBadwords.badwords.push(bWord);
                saveBadWord(listOfBadwords).then(() => {}).catch(err => console.log(err))
            }
            return listOfBadwords;

        }
        /**
         * note that this function replaces all lists with the incoming one
         * @param {a complete JSON object that comes from teh front end} updatedBadWordList 
         */
    const updateBadWordList = (updatedBadWordList) => {
            let newUpdatedList = {
                "badwords": updatedBadWordList
            }
            saveBadWord(newUpdatedList).then(() => {
                listOfBadwords.badwords = [];
                listOfBadwords.badwords = [...updatedBadWordList];
            }).catch(err => console.log(err))
            return listOfBadwords;
        }
        /**
         * one remove one word at a time
         * @param {bad word to be removed from list} thisBadWord 
         */
    const removeBadWord = (thisBadWord) => {
        let newBadWordList = listOfBadwords.badwords.filter(word => word !== thisBadWord);
        let newObject = {
            "badwords": newBadWordList
        }
        saveBadWord(newObject).then(() => {
            listOfBadwords.badwords = [];
            listOfBadwords.badwords = [...newBadWordList];
            console.log(listOfBadwords)
        }).catch(err => console.log(err))


    }

    getBadWordList();
    getStopWords();
    /**
     * Saves to file 
     * @param {data to be saved (JSON file of bad word)} data 
     */
    async function saveBadWord(data) {
        let json = JSON.stringify(data);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(bad_word_path, json, 'utf-8');
    }

    return {
        addNewBadWord,
        getBadWordList,
        updateBadWordList,
        removeBadWord,
        getStopWords

    };


})();