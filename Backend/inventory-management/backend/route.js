const express = require("express");

const adminController = require("./controller");

const router = express.Router();

router.get("/", adminController.getInventory);
router.get("/get-item/:itemid", adminController.getItem);
router.post("/add-item", adminController.addItem);
router.post("/buy-item/:itemId/:amount", adminController.buyItem);
router.post("/delete-item/:itemId", adminController.deleteItem);

module.exports = router;
