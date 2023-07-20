const express = require("express");
const adminController = require("./controller");

const router = express.Router();

router.get("/", adminController.getAll);
router.get("/get-item/:itemId", adminController.getItem);
router.post("/add-item", adminController.addItem);
router.post("/edit-item/:itemId", adminController.editItem);
router.post("/delete-item/:itemId", adminController.deleteItem);

module.exports = router;
