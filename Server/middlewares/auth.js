const jwt = require("jsonwebtoken");

// Secret key
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Middleware to verify user token
const verifyUser = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.json({ status: 'fail', message: "You are not authorized" });
    } else {
        jwt.verify(token, JWT_SECRET_KEY, {}, (err, decoded) => {
            if (err) {
                return res.json({ status: 'fail', message: "Token is not valid" });
            } else {
                req.id = decoded.id;
                req.email = decoded.email;
                req.username = decoded.username;
                req.role_id = decoded.role_id;
                next();
            }
        });
    }
};

module.exports = verifyUser;