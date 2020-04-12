const path = require('path'),
    { adminService } = require(path.join(__dirname, '..', 'services'));


exports.createAd = (req, res, next) => {
    res.send("Adming is working");
}

exports.getBadWords = (req, res, next) => {
    adminService.getBadWords()
        .then(result => {

            res.json(result);
        }).catch(err => res.send(err));

}

exports.addBadWord = (req, res, next) => {
    adminService.addBadWord(req.body.badwords);

}

exports.removeBadWord = (req, res, next) => {
    adminService.removeBadWord(req.body.badwords);
}


exports.updateBadWord = (req, res, next) => {
    adminService.updateBadWordList(req.body);
}