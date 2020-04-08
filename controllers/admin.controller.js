const
    path = require('path'), 
    { adminService } = require(path.join(__dirname, '..', 'services'));

exports.createAd = (req, res, next) => {
    res.send("Adming is working");
}
