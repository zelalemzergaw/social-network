const path = require('path'),
    multer = require('multer'),
    router = require('express').Router(),
    stoargePath = path.join(__dirname, '..', 'resources/images'),
    randomstring = require('randomstring'),
    { imageUploaderController } = require(path.join(__dirname, '..', 'controllers'));


const storage = multer.diskStorage({
    destination: stoargePath,
    filename: (req, file, callback) => {
        callback(null, Date.now() + randomstring.generate() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.post('/profile-image', upload.any(), imageUploaderController.imageUploader);
router.post('/remove-image', imageUploaderController.removeUploadedImage);
module.exports = router;