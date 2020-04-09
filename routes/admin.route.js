const
    path = require('path')
router = require('express').Router(), { adminController } = require(path.join(__dirname, '..', 'controllers'));

router.post('/create-ad', adminController.createAd);
router.get('/get-bad-words', adminController.getBadWords);
router.post('/add-bad-word', adminController.addBadWord);
router.post('/delete-bad-word', adminController.removeBadWord);
router.post('/update-bad-word', adminController.updateBadWord);

module.exports = router;