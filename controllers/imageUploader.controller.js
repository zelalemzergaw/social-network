const path = require('path'),
    { imageUploaderService } = require(path.join(__dirname, '..', 'services'));


exports.imageUploader = (req, res, next) => {
    const file = req.file;
    if (!file) {
        res.json({ "err": "Uploading... Failed!" });
    }
    res.send(file.filename);
}