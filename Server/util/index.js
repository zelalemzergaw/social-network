const
     path = require('path'),
     authService = require(path.join(path.join(__dirname, 'error', 'errorHandler'))),
     ApiResponse = require(path.join(__dirname, 'response')),
     notiTypes = require(path.join(__dirname, "noti-types"));

module.exports =  {
     ApiResponse,
     notiTypes
};