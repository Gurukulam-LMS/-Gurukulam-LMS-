const fs = require("fs");
const path = require("path");
var mongoose = require('mongoose');
require("dotenv").config();
const Razorpay = require("razorpay");

exports.orders = async (req, res) => {
  try {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "receipt_order_74394",
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).send("Some error occured");

    res.status(200).send(order);
} catch (error) {
    res.status(500).send(error);
}
  
};
