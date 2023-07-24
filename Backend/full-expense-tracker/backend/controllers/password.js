const ForgotPasswordRequests = require("../models/forgotPass");
const User = require("../models/user");
var Sib = require("sib-api-v3-sdk");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.forgotPass = async (req, res) => {
    const emailId = req.body.email;
    const newUuid = uuidv4();
    try {
        const user = await User.findOne({ where: { email: emailId } });
        // store in table
        await ForgotPasswordRequests.create({
            id: newUuid,
            userId: user.id,
            isActive: true,
        });
        // generate a link
        const resetLink =
            "http://localhost:3000/password/resetpassword/" + newUuid;

        // email client
        Sib.ApiClient.instance.authentications["api-key"].apiKey =
            process.env.SIB_API;

        new Sib.TransactionalEmailsApi()
            .sendTransacEmail({
                subject: "Hello from the Node SDK!",
                sender: {
                    email: "ajaycc17@gmail.com",
                    name: "Expense Tracker",
                },
                replyTo: {
                    email: "ajaycc17@gmail.com",
                    name: "Expense Tracker",
                },
                to: [{ name: "John Doe", email: emailId }],
                textContent:
                    "This is your link to reset password: {{params.resetLink}}",
                params: { resetLink: resetLink },
            })
            .then(
                function (data) {
                    console.log(data);
                    res.json({
                        message: "Link sent to the email.",
                        success: true,
                    });
                },
                function (error) {
                    console.error(error);
                }
            );
    } catch (error) {
        res.json({ message: error });
    }
};

exports.resetPass = async (req, res, next) => {
    const reqId = req.params.resetuuid;
    try {
        const request = await ForgotPasswordRequests.findOne({
            where: { id: reqId },
        });
        if (request !== null) {
            if (request.isActive) {
                res.send(
                    `<form action='/password/change-pass' method='POST'><input type='password' name='setPass' id='setPass' required><input type='hidden' name='theUuid' id='theUuid' value=${reqId}><input type='submit' value='Reset'></form>`
                );
            }
        }
    } catch (err) {
        res.json({ message: err });
    }
};

exports.changePass = async (req, res, next) => {
    const newPass = req.body.setPass;
    const theUuid = req.body.theUuid;
    console.log(req.body);
    try {
        const request = await ForgotPasswordRequests.findOne({
            where: { id: theUuid },
        });
        if (request !== null) {
            if (request.isActive) {
                const userId = request.userId;
                const saltRounds = 10;
                bcrypt.hash(newPass, saltRounds, async (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    const user = await User.findOne({
                        where: { id: userId },
                    });
                    user.password = hash;
                    await user.save();

                    request.isActive = false;
                    await request.save();

                    res.status(201).redirect(
                        "http://127.0.0.1:5500/frontend/login.html"
                    );
                });
            }
        }
    } catch (err) {
        res.json({ message: err });
    }
};
