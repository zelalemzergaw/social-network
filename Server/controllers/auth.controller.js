const 
    path = require('path'),
    { ApiResponse } = require(path.join(__dirname, "..", "util")),
    { authService } = require(path.join(__dirname, '..', 'services'));

exports.register =  async (req, res, next) => {
    try{
        let response = await authService.signup(req.body);
        res.status(response.status).json(response);
    }catch(err) {
        res.status(500).json(new ApiResponse(500, 'error', err));
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

exports.forgotPassword = async (req, res, next) => {
    try{
        if(!req.body.email) {
            res.status(500).json(new ApiResponse(500, 'error', {err: "Email required"}));
        }
       let response  = await authService.forgotPassword(req.body.email);
       res.status(response.status).json(response);
    }
    catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(501, 'error', err));
    }
    
}

exports.resetPassword  = async (req, res, next) => {
    try{
       let response= await authService.resetPassword(req.body.token, req.body.password);
       res.status(response.status).json(response);
    }catch(err) {
        console.log(err);
        res.status(500).json(new ApiResponse(500, 'error', err));
    }
}

