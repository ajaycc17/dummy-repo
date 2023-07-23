const User = require("../models/user");

exports.signUp = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ where: { email: email } });
        if (user === null) {
            const newUser = await User.create({
                name: name,
                email: email,
                password: password,
            });
            res.json(newUser);
        } else {
            res.json({
                message: "User with this email id already exists!",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.logIn = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            where: { email: email },
        });
        if (user !== null) {
            if (user.password === password) {
                res.json({ success: true, message: "Successfully logged in." });
            } else {
                res.json({ success: false, message: "Incorrect password." });
            }
        } else {
            res.json({
                success: false,
                message: "User with this email id does not exist.",
            });
        }
    } catch (err) {
        console.log(err);
    }
};
