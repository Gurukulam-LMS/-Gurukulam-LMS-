const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");
require("dotenv").config();
const Razorpay = require("razorpay");
const Payment = require("../model/payment");
const Coupon = require("../model/coupon");
const Users = require("../model/users");
const Course = require("../model/course");

exports.activeUsers = (req, res) => {
  Users.find({ $expr: { $gte: [{ $size: "$local.usedCoupons" }, 1] } })
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
        _id: "",
        amount: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        amount: "$amount",
      },
    },
  ])
    .then((totalAmount) => {
      res.status(200).json({ totalRevenue: totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Coupon Exits" });
    });
};

exports.topCourses = (req, res) => {
  Course.find({ purchased: { $ne: 0 } })
    .sort({ purchased: -1 })
    .then((topCourses) => {
      res.status(200).json({ topCourses: topCourses });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Coupon Exits" });
    });
};

exports.getRevenueCat = (req, res) => {
  Course.find({ category: { $elemMatch: { $eq: req.params.category } } })
    .then((topCourses) => {
      var revenue = 0;
      for (let i = 0; i < topCourses.length; i++) {
        revenue = revenue + topCourses[i].price * topCourses[i].purchased;
      }
      res.status(200).json({ finalRevenue: revenue });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Course Exits" });
    });
};

module.exports.getRevenueOfAllCat = async (req, res) => {
  try {
    const courses = await Course.find({});
    const catRevenue = {};
    courses?.forEach((course) => {
      let courseRev = course.price * course.purchased;
      course.category?.forEach((cat) => {
        if (!!catRevenue[cat]) {
          catRevenue[cat] += courseRev;
        } else {
          catRevenue[cat] = courseRev;
        }
      });
    });
    return res.status(200).json({ catRevenue });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Unable to fetch all category revenue" });
  }
};

exports.timeSpent = (req, res) => {
  var doc = req.body;
  console.log(doc);
  Users.find({
    $and: [
      { _id: doc.userId },
      { "local.courseWatchTime": { $elemMatch: { courseId: doc.courseId } } },
    ],
  })
    .then((resp) => {
      res.status(200).json({ message: "Success", result: resp });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Failed to get Data ");
    });
};
