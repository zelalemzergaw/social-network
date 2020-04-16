const path = require('path'),
    router = require('express').Router(),
    { adminController } = require(path.join(__dirname, '..', 'controllers'));

router.post('/create-ad', adminController.createAd);
router.get('/get-bad-words', adminController.getBadWords);
router.post('/add-bad-word', adminController.addBadWord);
router.post('/delete-bad-word', adminController.removeBadWord);
router.post('/update-bad-word', adminController.updateBadWord);
router.post('/create-ad', adminController.createAd);
router.post('/edit-ad', adminController.editAdvertisement);
router.get('/ads/:id', adminController.getAdv);
router.post('/delete-ad/:id', adminController.deleteAdv);

module.exports = router;