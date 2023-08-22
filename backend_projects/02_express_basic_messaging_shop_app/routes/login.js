const fs = require("fs");
const path = require("path");

const express = require("express");

const contactController = require("../controllers/contact");
const rootDir = require("../util/path");
const router = express.Router();

// show login form
router.get("/login", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "login.html"));
});

// log in user by setting localstorage username as his username
router.post("/add-user", (req, res, next) => {
    const username = req.body.username;
    res.send(
        `<script>
            window.localStorage.setItem("username", "${username}");
            location.replace("/");
        </script>`
    );
});

// show messages sending form
router.get("/", (req, res, next) => {
    // read messages from file and display them
    fs.readFile("./routes/messages.txt", "utf8", (err, data) => {
        if (err) {
            res.send(
                `<head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
                        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
                    <title>Home Page</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <a class="navbar-brand fs-6" href="/">Naive Messaging+Shop App</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li class="nav-item">
                                        <a class="nav-link active" href="/">Home</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/shop">Shop</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/admin/add-product">Add Product</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/contact-us">Contact Us</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/login">Login</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <main class="w-50 py-3 mx-auto">
                    <div>
                        <p>${err}</p>
                    </div>
                        <form action="/" method="POST" class="d-flex"
                        onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                            <div class="mb-3 w-100 me-3">
                                <input type="text" class="form-control" name="message" id="message" placeholder="Your message">
                                <input type="hidden" id="username" name="username">
                            </div>
                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
                crossorigin="anonymous"></script>`
            );
        }
        // if no error occurs then show messages and message form
        res.send(
            `<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
                    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
                <title>Home Page</title>
            </head>
            <body>
                <nav class="navbar navbar-expand-lg bg-body-tertiary">
                    <div class="container-fluid">
                        <a class="navbar-brand fs-6" href="/">Naive Messaging+Shop App</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/shop">Shop</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/admin/add-product">Add Product</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="/contact-us">Contact Us</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="/login">Login</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <main class="w-50 py-3 mx-auto">
                <div>
                    <p id="messages"></p>
                </div>
                    <form action="/" method="POST" class="d-flex"
                    onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
                        <div class="mb-3 w-100 me-3">
                            <input type="text" class="form-control" name="message" id="message" placeholder="Your message">
                            <input type="hidden" id="username" name="username">
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </form>
                </main>
            </body>
            <script>
                localStorage.getItem("username") !== null ? document.getElementById("messages").appendChild(document.createTextNode("${data}")): console.log("Login");
            </script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
            crossorigin="anonymous"></script>`
        );
    });
});

// add message to file
router.post("/", (req, res, next) => {
    let mess = req.body.username + ": " + req.body.message + " · ";
    fs.appendFile("./routes/messages.txt", mess, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
});

// using controllers
router.get("/contact-us", contactController.contact);
router.post("/success", contactController.success);

module.exports = router;
