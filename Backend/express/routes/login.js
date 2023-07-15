const path = require("path");
const fs = require("fs");

const express = require("express");
const rootDir = require("../util/path");
const router = express.Router();

router.get("/login", (req, res, next) => {
    res.send(
        '<form action="add-user" method="POST"><input type="text" name="username"><button type="submit">Login</button></form>'
    );
});

router.post("/add-user", (req, res, next) => {
    res.send(
        `<script>window.localStorage.setItem("username", "${req.body.username}");location.replace("/")</script>`
    );
});

router.get("/", (req, res, next) => {
    fs.readFile("./routes/messages.txt", "utf8", (err, data) => {
        if (err) {
            res.send(
                `<p>${err}</p><form action="/" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST"><input type="text" name="message" placeholder="Your message"><input type="hidden" is="username" name="username"><button type="submit">Send</button></form>`
            );
        }
        res.send(
            `<p id="messages"></p><form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="POST"><input type="text" name="message" placeholder="Your message"><input type="hidden" id="username" name="username"><button type="submit">Send</button></form><script>
            localStorage.getItem("username") !== null ? document.getElementById("messages").appendChild(document.createTextNode("${data}")): console.log("Login");
            </script>`
        );
    });
});

router.post("/", (req, res, next) => {
    let mess = req.body.username + ": " + req.body.message + " ";
    fs.appendFile("./routes/messages.txt", mess, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

router.get("/contactus", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "contact.html"));
});
router.post("/success", (req, res, next) => {
    res.send("<h1>Form successfuly filled</h1>");
});

module.exports = router;
