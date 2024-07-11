require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware function for JWT verification
module.exports.tokenVerification = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        //  console.log("token - " + token)

        jwt.verify(token, process.env.JWT_PRIVATE_KEY, async (err, data) => {
            if (err) {
                console.log(err)
                return res.status(401).json({ status: false, message: "Session Expired ! Please login again . " });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json("Authentication failed!")

    }


};
