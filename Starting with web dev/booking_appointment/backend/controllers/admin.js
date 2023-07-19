const User = require("../models/user");

exports.getAllBookings = (req, res, next) => {
    User.findAll()
        .then((user) => {
            res.send(user);
        })
        .catch((err) => console.log(err));
};

exports.getBooking = (req, res, next) => {
    const userId = req.params.bookingId;
    User.findByPk(userId)
        .then((user) => {
            res.send(user);
        })
        .catch((err) => console.log(err));
};

exports.postBooking = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    User.create({
        name: name,
        email: email,
        phone: phone,
    })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
};
exports.postEditBooking = (req, res, next) => {
    const userId = req.params.bookingId;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    User.findByPk(userId)
        .then((user) => {
            user.name = name;
            user.email = email;
            user.phone = phone;
            return user.save();
        })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
};
exports.postDeleteBooking = (req, res, next) => {
    const userId = req.params.bookingId;
    User.findByPk(userId)
        .then((result) => {
            return result.destroy();
        })
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => console.log(err));
};
