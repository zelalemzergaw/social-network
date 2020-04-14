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
async function addAdvertisement(id,advData) {

    const advertisement = new Ad({
       text : advData.text,
       link:advData.link,
       postby: advData.postby,
       datepublished:advData.datepublished,
       targetedUser: advData.age,
       targetedUser: advData.location
    });
        
     let ad_ =   await advertisement.save();
     
     await userService.updateUser(id, {adId:ad_._id});
    
    
    }