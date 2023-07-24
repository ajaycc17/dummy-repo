const User = require("../models/user");
var Sib = require("sib-api-v3-sdk");
require("dotenv").config();

exports.forgotPass = async (req, res) => {
    const emailId = req.body.email;
    Sib.ApiClient.instance.authentications["api-key"].apiKey =
        process.env.SIB_API;

    new Sib.TransactionalEmailsApi()
        .sendTransacEmail({
            subject: "Hello from the Node SDK!",
            sender: { email: "ajaycc17@gmail.com", name: "Sendinblue" },
            replyTo: { email: "ajaycc17@gmail.com", name: "Sendinblue" },
            to: [{ name: "John Doe", email: emailId }],
            htmlContent:
                "<html><body><h1>This is a transactional email {{params.bodyMessage}}</h1></body></html>",
            params: { bodyMessage: "Made just for you!" },
        })
        .then(
            function (data) {
                console.log(data);
            },
            function (error) {
                console.error(error);
            }
        );
    res.json({ message: "Link sent to the email.", success: true });
};
