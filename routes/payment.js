const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");
const Auth = require("../middleware/isAuth");

router.post("/orders", paymentController.orders);

module.exports = router;
