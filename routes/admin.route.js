const
    path = require('path')
router = require('express').Router(), { adminController } = require(path.join(__dirname, '..', 'controllers'));

router.post('/create-ad', adminController.createAd);
router.get('/bad-words', (req, res, next) => console.log("HERE"), adminController.getBadWords);

module.exports = router;