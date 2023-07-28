const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateAccessTokenOnPremium = (id, name, isPremium) => {
    return jwt.sign(
        { userId: id, name: name, isPremium: isPremium },
        process.env.JWT_SECRET
    );
};

exports.generateAccessTokenOnLogin = (id, name) => {
    return jwt.sign({ userId: id, name: name }, process.env.JWT_SECRET);
};
