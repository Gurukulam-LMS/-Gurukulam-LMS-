const express = require("express");
const router = express.Router();
const couponController = require("../controllers/Coupon");
const Auth = require("../middleware/isAuth");

router.post("/createCoupon", couponController.createCoupon);
router.get("/getCoupon", couponController.getCoupon);
router.post("/verifyCoupon", couponController.verifyCoupon);
router.post("/checkoutCoupon", couponController.checkoutCoupon);
router.delete("/deleteCoupon", couponController.deleteCoupon);

module.exports = router;
