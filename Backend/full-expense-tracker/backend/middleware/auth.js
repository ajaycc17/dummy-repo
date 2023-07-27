const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.authenticate = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const user = jwt.verify(token, "secretKey");
        User.findByPk(user.userId).then((user) => {
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ success: false });
    }
};
