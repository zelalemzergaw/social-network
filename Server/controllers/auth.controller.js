const 
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { authService } = require(path.join(__dirname, '..', 'services'));

exports.register =  async (req, res, next) => {
    try{
        let response = await authService.signup(req.body);
        console.log(response, "OOOOO")
        res.status(response.status).json(response);
    }catch(err) {
        res.status(500).json(err);
    }

}
exports.login = async (req, res, next) => {
    try {
        let response = await authService.login(req.body.username, req.body.password);
        res.status(response.status).json(response);
    }catch(err) {
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
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

