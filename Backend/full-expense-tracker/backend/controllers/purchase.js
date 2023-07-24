const Razorpay = require("razorpay");
const Order = require("../models/orders");
require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateAccessToken(id, name, isPremium) {
    return jwt.sign(
        { userId: id, name: name, isPremium: isPremium },
        "secretKey"
    );
}

exports.purchasePremium = async (req, res, next) => {
    try {
        var rzp = new Razorpay({
            key_id: process.env.RZP_KEY_ID,
            key_secret: process.env.RZP_SECRET_KEY,
        });
        const amount = 2500;

        rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
            // if (err) {
            //     throw new Error(JSON.stringify(err));
            // }
            req.user
                .createOrder({ orderid: order.id, status: "PENDING" })
                .then(() => {
                    return res.status(201).json({ order, key_id: rzp.key_id });
                })
                .catch((err) => {
                    throw new Error(err);
                });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};

exports.updateTransactionStatus = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });
        await order.update({ payment_id: payment_id, status: "SUCCESSFUL" });
        await req.user.update({ isPremiumUser: true });
        return res.status(202).json({
            success: true,
            message: "Transaction successful",
            token: generateAccessToken(
                req.user.id,
                req.user.name,
                req.user.isPremiumUser
            ),
        });
    } catch (err) {
        throw new Error(err);
    }
};

exports.updateFailedStatus = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });
        await order.update({ payment_id: payment_id, status: "FAILED" });
        res.status(400).json({ message: "Transaction failed" });
    } catch (err) {
        throw new Error(err);
    }
};
