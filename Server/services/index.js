const
    path = require('path'),
    adminService = require(path.join(__dirname, 'admin'))
authService = require(path.join(__dirname, 'auth')),
    userService = require(path.join(__dirname, 'user')),
    systemService = require(path.join(__dirname, 'system')),
    errorHandlerService = require(path.join(__dirname, '..', 'util'));
sharedService = require(path.join(__dirname, 'shared'));




module.exports = {
    systemService,
    adminService,
    authService,
    userService,
    errorHandlerService,
    sharedService
}