const express = require("express");

const passwordController = require("../controllers/password");

const router = express.Router();

router.post("/forgotpassword", passwordController.forgotPass);
router.get("/resetpassword/:resetuuid", passwordController.resetPass);
router.post("/change-pass", passwordController.changePass);

module.exports = router;
