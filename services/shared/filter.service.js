const fs = require('fs'),
    path = require('path'),
    util = require('util');



const badWordService = (() => {
    let listOfBadwords;
    const bad_word_path = path.join(__dirname, '..', '..', '/resources/bad_word', 'badWord.json');
    // if (listOfBadwords === undefined) {
    //     loadBadWord().then(bdWordList => {
    //         listOfBadwords = bdWordList;

    //     }).catch(err => console.log(err))
    // }

    /**
     * returns bad word list 
     */
    const getBadWordList = async() => {
        if (listOfBadwords === undefined) {
            await loadBadWord().then(bdWordList => {
                listOfBadwords = bdWordList;

            }).catch(err => console.log(err))

        }
        return listOfBadwords.badWords;
    }
    const addBadWordToList = (bWord) => {
            listOfBadwords.badWords.push(bWord);
            saveBadWord(listOfBadwords).then(() => {}).catch(err => console.log(err))

        }
        /**
         * note that this function replaces all lists with the incoming one
         * @param {a complete JSON object that comes from teh front end} updatedBadWordList 
         */
    const updateBadWordList = (updatedBadWordList) => {
            saveBadWord(updatedBadWordList).then(() => {
                listOfBadwords = updateBadWordList;
            }).catch(err => console.log(err))

        }
        /**
         * one remove one word at a time
         * @param {bad word to be removed from list} thisBadWord 
         */
    const removeBadWord = (thisBadWord) => {
        let newBadWordList = listOfBadwords.badWords.find(word => word !== thisBadWord);
        saveBadWord(newBadWordList).then(() => {
            listOfBadwords.badWords = [];
            listOfBadwords.badWords = [...newBadWordList];
        }).catch(err => console.log(err))


    }

    async function loadBadWord() {
        const readFile = util.promisify(fs.readFile);
        const list = await readFile(bad_word_path, 'utf-8');
        return JSON.parse(list);
    }


    async function saveBadWord(data) {
        let json = JSON.stringify(data);
        const writeFile = util.promisify(fs.writeFile);
        await writeFile(bad_word_path, json, 'utf-8');
    }

    return {
        getBadWordList,
        addBadWordToList,
        updateBadWordList,
        removeBadWord

    }


})();


module.exports = badWordService