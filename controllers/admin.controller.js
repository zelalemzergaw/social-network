const path = require('path'),
    { adminService, filterService } = require(path.join(__dirname, '..', 'services'));


exports.createAd = (req, res, next) => {
    res.send("Adming is working");
}

exports.getBadWords = (req, res, next) => {
    console.log('am i here: in admin controllrs')
    res.json(adminService.getBadWords());

}