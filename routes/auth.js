const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// Admin need to enter first_name , last_name , email , password , confirmPassword
router.post("/createnewadmin", authController.newAdmin);

// if Admin verfied then login , otherwise ask Admin to verify first
router.post("/login", authController.login);

// to verify Admin by otp
router.post("/login/verify/:email/:token", authController.verifyToken);

// if Admin want to reset his password then send otp to Admin
router.post("/login/forgotpassword", authController.forgot_Password);

// after verify , reset password otp , allow Admin to set new password
router.post("/login/reset-password/", authController.newPassword);

module.exports = router;
