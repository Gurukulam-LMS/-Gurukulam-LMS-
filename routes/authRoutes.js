const { Router } = require("express");
const authController = require("../controllers/authController");
const limiter = require("../config/rateLimiter");
const router = Router();

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

module.exports = router;
