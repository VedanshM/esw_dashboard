const jwt = require('jsonwebtoken'),
    config = require('../jwt_key');
const jwt_key = require('../jwt_key');

module.exports = {
    isAuthenticated: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token || token == "undefined") {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, jwt_key.JWT_SECRET, function (err, decoded) {
                if (err) {
                    console.log(err, "error")
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    req.name = decoded.name;
                    req.username = decoded.name;
                    next();
                }
            });
        }
    },
    getUserData: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token || token == "undefined") {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, jwt_key.JWT_SECRET, function (err, decoded) {
                req.name = decoded.name;
                req.username = decoded.username;
                next();
            });
        }
    }
};