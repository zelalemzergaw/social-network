const path = require('path'),
    fs = require('fs'),
    util = require('util'),
    imageFolderLocation = path.join(__dirname, '..', 'resources/images');

exports.imageUploader = (req, res, next) => {
    const files = req.files;
    try {
        if (!files) {
            res.json({ "err": "Uploading... Failed!" });
        }
        res.json(files[0].filename);

    } catch (error) {
        console.log('error has happend')

    }

}

exports.removeUploadedImage = (req, res, next) => {
    const unlink = fs.unlink;
    unlink(imageFolderLocation, req.body, function(err) {
        if (err) {
            console.log("something went wrong")
        }
        res.json('imaged Deleted Succesfully');
    });
}