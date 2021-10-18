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

exports.studentWatchTime = async (req, res) => {
  try {
    const { userId, courseId, timeSpent } = req.body;

    if (!userId || !courseId || !timeSpent)
      return res.status(404).json({ message: "Data missing" });

    const getUser = await Users.findById(userId);
    if (!getUser) return res.status(404).json({ message: "User Not found" });

    const courseWatchTime = getUser.local.courseWatchTime?.find(
      (course) => course.courseId === courseId
    );
    if (!courseWatchTime) {
      const watchTime = {
        courseId,
        watchTime: parseFloat(timeSpent),
      };
      getUser.local.courseWatchTime?.push(watchTime);
    } else {
      courseWatchTime.watchTime += parseFloat(timeSpent);
    }

    //saving user watch time date wise
    const date = new Date();
    const getDay = date.getDay();
    var allDaysTime = JSON.parse(
      JSON.stringify(getUser.local.studentWatchTimeDays)
    );
    if (getDay === 1 && allDaysTime[0] !== 0) {
      allDaysTime = new Array(7).fill(0);
    }
    allDaysTime[getDay] += parseFloat(timeSpent);

    getUser.local.studentWatchTimeDays = allDaysTime;
    getUser.save();
    return res.status(201).json({ message: "Time added" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Unable to add user watch time", err });
  }
};

exports.getRevenueCat = (req, res) => {
  console.log(req.params.category);
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

exports.getRevenueOfAllCat = async (req, res) => {
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

module.exports.getWatchTimeByDays = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId == null) return res.status(404).json({ message: "Id missing" });
    const getUser = await Users.findById(userId);
    if (!getUser) return res.status(404).json({ message: "User not found" });
    const watchTimeDays = getUser.local.studentWatchTimeDays;
    if (!watchTimeDays)
      return res
        .status(404)
        .json({ message: "Watch time per days not available" });
    return res.status(200).json({ watchTimePerDays: watchTimeDays });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to fetch all courses" });
  }
};
