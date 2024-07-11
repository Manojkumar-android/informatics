require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, rememberMe) => {
    const expiresIn = rememberMe ? 24 * 60 * 60 : 60 * 5; // 1 day if rememberMe is true, otherwise 1 hour

    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
        expiresIn: expiresIn,
    });
};