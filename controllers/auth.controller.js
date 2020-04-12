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

exports.forgotPassword = (req, res, next) => {
    if (!req.body.email) {
        return res
        .status(500)
        .json({ message: 'Email is required' });
        }
    authService.forgotPassword(req.body.email).then(r => {
        res.json({message: "Reset email has sent to you"});
    }).catch(err => res.send(err));
    
}

exports.resetPassword  = (req, res, next) => {
     authService.resetPassword(req.body.token, req.body.newPassword).then(r => {
         res.json({message: "You have successfully rested your password"});
     }).catch(err => res.send(err));
}

