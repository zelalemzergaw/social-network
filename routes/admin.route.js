const 
    path = require('path')
    router = require('express').Router(),
    { adminController } = require(path.join(__dirname, '..','controllers'));

router.post('/create-ad', adminController.createAd);

module.exports = router;