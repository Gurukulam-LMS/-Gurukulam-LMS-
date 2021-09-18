const fs = require("fs");
const path = require("path");
var mongoose = require('mongoose');
require("dotenv").config();
const Razorpay = require("razorpay");
const Payment = require("../model/payment");

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

exports.success = async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            userId,
            courseId,
            amount,
            couponId,
            name
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT
        const payment = new Payment({
            name : name,
            userId : userId,
            couponId : couponId,
            amount : amount,
            courseId : courseId,
            razorpayOrderId : razorpayOrderId,
            razorpayPaymentId : razorpayPaymentId,
            orderCreationId : orderCreationId,
          });
          payment
          .save()
          .then((result) => {
            //console.log(result);
            res.status(200).json
                ({  msg: "success",
              orderId: razorpayOrderId,
              paymentId: razorpayPaymentId});
          })
          .catch((err) => {
            console.log(err);
          });
    } catch (error) {
        res.status(500).send(error);
    }
};