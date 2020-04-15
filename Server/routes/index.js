const
    path = require('path'),
    adminRoute = require(path.join(__dirname, 'admin.route')),
    authRoute = require(path.join(__dirname, 'auth.router')),
    userRoute = require(path.join(__dirname, 'user.router')),
    uploadRoute = require(path.join(__dirname, 'imageUploader.route')),
    { verifyToken, authorize } = require(path.join(__dirname, 'security')).security;

function initRoutes(server) {
    server.use('/api/uploads', uploadRoute);
    server.use("/api/auth", authRoute);
    server.use('/api/admin', verifyToken, authorize, adminRoute);
    server.use('/api/user',verifyToken,(req, res, next)=> { console.log("AFTER THat"),next()}, userRoute);
    server.use('/api/users',verifyToken, userRoute);
    server.use('/', (req, res, next) => res.send('API works!'));
}

module.exports = {
    initRoutes
}