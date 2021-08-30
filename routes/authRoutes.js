const { Router } = require("express");
const authController = require("../controllers/authController");
const limiter = require("../middlewares/rateLimiter");
const router = Router();
const imageUpload = require("../middlewares/imageUpload");

//routes
// base api -->  /api/auth

router.post("/signup", limiter.postReqLimiter, authController.signup_post); //SignUpPOST
router.post("/login", limiter.postReqLimiter, authController.login_post); //LoginPOST
router.post(
  "/email/forgot",
  limiter.postReqLimiter,
  authController.forgotPassword
); //Getting Email from client for forgot password
router.post(
  "/email/reset/:token",
  limiter.postReqLimiter,
  authController.resetPassword
); //Getting passwords and confirm passwords for password rest
router.get("/oauth/:id", authController.getUser); //getting userBy id ;
router.get("/email/confirm/:id", authController.confirmEmail); //For Confirmation of email
router.post("/recaptcha", authController.validateCaptcha); //post req captchaValidation
router.post(
  "/profile",
  imageUpload.single("profileImage"),
  authController.profileUpdate
);
//Mobile_Number_Verification
router.post("/mobileNumberVerify", authController.mobileNumberVerify);
router.post("/verifyOTP", authController.verifyOTP);

module.exports = router;
