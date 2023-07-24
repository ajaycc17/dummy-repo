const express = require("express");

const passwordController = require("../controllers/password");

const router = express.Router();

router.post("/forgotpassword", passwordController.forgotPass);

module.exports = router;
