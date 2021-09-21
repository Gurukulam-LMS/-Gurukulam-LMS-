const fs = require("fs");
const path = require("path");
var mongoose = require('mongoose');
require("dotenv").config();
const Razorpay = require("razorpay");
const Payment = require("../model/payment");
const Coupon = require("../model/coupon");
const Users = require("../model/users");

exports.activeUsers = (req, res) => {
    Users.find({"$expr":{$gte:[{$size:"$local.usedCoupons"},1]}})
      .then((users) => {
          var count = users.length;
        res.status(200).json({ users: users, activeUsers: count });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ err: err, message: "No Coupon Exits" });
      });
  };

  exports.totalRevenue = (req, res) => {
    Payment.aggregate([
     {
        $group: {
            _id: '',
            amount: { $sum: '$amount' }
        }
    },
    { 
        $project: {
            _id: 0,
            amount: '$amount'
        }
    }
    ]
    )
      .then((totalAmount) => {
        res.status(200).json({ totalRevenue: totalAmount });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({ err: err, message: "No Coupon Exits" });
      });
  };