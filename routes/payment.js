const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const Auth = require("../middleware/isAuth");

router.post("/orders", paymentController.orders);
router.post("/success", paymentController.success);
router.get(
  "/coursesPurchasedByUser/:userId",
  paymentController.coursesPurchasedByUser
);
module.exports = router;