
const jwt = require('jsonwebtoken'),
      path = require('path'),
      { ApiResponse } = require(path.join('..', '..', 'util')),
      { userService } = require(path.join(__dirname, '..','..','services'));

exports.verifyToken  = (req, res, next) => {
    const token = req.header('access-token');
    try {
        if(!token) {
            res.status(401).json(new ApiResponse(401, "error", {err: "Unauthorized User"}));
        }
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verified.id;
        next();
    }
    catch(err) {
        res.status(401).json(new ApiResponse(401, "error", err));
    }
}

exports.authorize = (req, res, next) => {
    userService.getUserById(req.userId)
               .then(u => {
                    if (u.role !== 'ADMIN') {
                        res.status(401).json(new ApiResponse(401, "error", {err: "Unauthorized ADMIN"}));
                    } 
                    next(); 
               }).catch(err => res.send(err));
     

}