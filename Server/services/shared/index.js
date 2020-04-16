const
    path = require('path'), 
    filterService = require(path.join(__dirname, 'filter.service')),
    mailerService = require(path.join(__dirname, 'mailer.service'));

module.exports = {
    filterService,
    mailerService
}