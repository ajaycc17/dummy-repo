const User = require("../models/user");

exports.signUp = async (req, res, next) => {
    console.log(req.body);
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
