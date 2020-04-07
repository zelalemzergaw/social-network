const 
    path = require('path'),
    { authService } = require(path.join(__dirname, '..', 'services'));

exports.register =  (req, res, next) => {
    authService.signup(req.body)
               .then(result => {
                   res.json({ message: "You have successfully registered!"});
               }).catch(err => res.send(err));

}
exports.login = (req, res, next) => {
    authService.login(req.body.username, req.body.password)
               .then(user => {
                   res.json(user);
               })
               .catch(err => res.send((err)));
}

exports.updateUser =  (req, res, next) => {

}

exports.resetPassword = (req, res, next) => {

}

