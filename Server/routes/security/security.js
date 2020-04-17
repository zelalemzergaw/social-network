const jwt = require('jsonwebtoken'),
    path = require('path'),
    { ApiResponse } = require(path.join('..', '..', 'util')),
    { userService } = require(path.join(__dirname, '..', '..', 'services'));

exports.verifyToken = (req, res, next) => {
    const token = req.header('access-token');
    try {
        if (!token) {
            res.status(401).json(new ApiResponse(401, "error", { err: "Unauthorized User" }));
        }
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = verified.id;
        return next();
    } catch (err) {
        res.status(401).json(new ApiResponse(401, "error", err));
    }
}

exports.authorize = (req, res, next) => {
    userService._getUserById(req.userId)
        .then(u => {
            if (u.role !== 'ADMIN') {
                console.log("not admin")
                res.status(401).json(new ApiResponse(401, "error", { err: "Unauthorized ADMIN" }));
            }
            return next();
        }).catch(err => res.send(err));


}