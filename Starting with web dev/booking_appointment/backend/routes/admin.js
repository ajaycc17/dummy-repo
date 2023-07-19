const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/", adminController.getAllBookings);
router.get("/get-appointment/:bookingId", adminController.getBooking);
router.post("/add-appointment", adminController.postBooking);
router.post("/edit-appointment/:bookingId", adminController.postEditBooking);
router.post(
    "/delete-appointment/:bookingId",
    adminController.postDeleteBooking
);

module.exports = router;
