const Coupon = require("../model/coupon");
const Users = require("../model/users");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
var mongoose = require("mongoose");
var modelMap = new Map();

exports.createCoupon = (req, res) => {
  const {
    couponcode,
    discountpercentage,
    maxstudents,
    students,
    type,
    starttime,
    expirytime,
    status,
  } = req.body;
  Coupon.findOne({ couponcode: couponcode })
    .then((coupon) => {
      if (coupon == null) {
        const coupon = new Coupon({
          couponcode: couponcode,
          discountpercentage: discountpercentage,
          maxstudents: maxstudents,
          usuage: maxstudents,
          students: students,
          type: type,
          starttime: starttime,
          expirytime: expirytime,
          status: status,
        });
        coupon
          .save()
          .then((result) => {
            //console.log(result);
            res.status(201).json({
              message: "Coupon created successfully",
              newCoupon: result,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.status(409).json({ message: "Coupon already exists" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Course Exits" });
    });
};

exports.getCoupon = (req, res) => {
  Coupon.find({
    status: { $ne: "DELETED" },
    usuage: { $ne: "0" },
    $or: [
      { type: "public" },
      { students: { $elemMatch: { id: "612de254c11c8748a47179d8" } } },
    ],
  })
    .then((coupon) => {
      res.status(200).json({ coupon: coupon });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Coupon Exits" });
    });
};

exports.verifyCoupon = (req, res) => {
  var doc = req.body;
  Coupon.findOne({
    $and: [{ couponcode: doc.couponCode }, { usuage: { $ne: 0 } }],
  })
    .then((coupon) => {
      if (coupon.type == "private") {
        Coupon.find({
          $and: [
            { couponcode: doc.couponCode },
            {
              students: {
                $elemMatch: { $and: [{ id: doc.userId }, { status: "NA" }] },
              },
            },
          ],
        })
          .then((result) => {
            if (result.length != 0) {
              const discount = parseInt(coupon.discountpercentage);
              var finalAmount = parseInt(doc.cartAmount) * (discount / 100);
              finalAmount = doc.cartAmount - finalAmount;

              res.status(200).json({
                message: "Success",
                couponData: result,
                finalAmount: finalAmount,
              });
            } else {
              res.status(404).json({ message: "No Coupon Exits" });
            }
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({ err: err, message: "No Coupon Exits" });
          });
      } else {
        const discount = parseInt(coupon.discountpercentage);
        var finalAmount = parseInt(doc.cartAmount) * (discount / 100);
        finalAmount = doc.cartAmount - finalAmount;
        res.status(200).json({
          message: "Success",
          couponData: coupon,
          finalAmount: finalAmount,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Coupon Exits" });
    });
};

exports.checkoutCoupon = (req, res) => {
  var doc = req.body;
  let coupon = {
    couponId: "",
    finalAmount: "",
  };
  Users.findOne({ _id: doc.userId })
    .then((user) => {
      coupon.couponId = doc.couponId;
      coupon.finalAmount = doc.finalAmount;
      user.local.usedCoupons.push(coupon);
      user.save().then((result) => {
        Coupon.updateOne(
          {
            _id: doc.couponId,
            students: { $elemMatch: { id: doc.userId } },
          },
          { $set: { "students.$.status": "Applied" } }
        ).then((resp) => {
          res.status(200).json({ message: "Success", result: result });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Failed to checkout ");
    });
};

exports.deleteCoupon = (req, res) => {
  var doc = req.body;
  Coupon.updateOne(
    {
      _id: doc.couponId,
    },
    { $set: { status: "DELETED" } }
  )
    .then((coupon) => {
      if (coupon.n != 0 && coupon.nModified != 0) {
        res.status(200).json({ message: "Success", coupon: coupon });
      } else {
        res.status(404).json({ message: "No Coupon Exits" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Failed to delete coupon");
    });
};
