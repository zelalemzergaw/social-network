const path  = require('path'),
      User = require(path.join(__dirname, 'user.model')),
      Ad = require(path.join(__dirname, 'advertisement.model')),
      Post = require(path.join(__dirname, 'post.model'));

module.exports = {
    User,
    Ad,
    Post
}