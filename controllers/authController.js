const jwt = require("jsonwebtoken");
const async = require("async");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
const messagebird = require("messagebird")(process.env.MESSAGEBIRD_API_KEY);

const User = require("../models/User"); //Model
const HttpError = require("../misc/HttpError"); //Helper function for Handle error
const sendEmail = require("../config/nodemailer"); //nodemailer
const emailTemplates = require("../config/emailTemplates"); //nodemailer-email-templates
const verifyReCAPTCHA = require("../config/googleReCAPTCHA");

// handle errors
const handleErrors = (err) => {
  let errors = { email: "", password: "" };
  // incorrect credentials
  if (err.message === "Incorrect Credentials")
    return new HttpError("Credentials seem to be wrong.", 401);
  // validation errors
  else if (err.message.includes("User validation failed"))
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  //Any unknown err
  else
    return new HttpError(
      err.message || "Something went wrong, Signing up failed",
      500
    );
  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

//SignUp Controller
module.exports.signup_post = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, token } =
      req.body;
    if (!firstName || !lastName || !email || !password || !confirmPassword)
      return res.json({ message: "Please Enter all details", ok: false });
    if (password != confirmPassword)
      return res.json({ message: "Passwords not matched", ok: false });
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
      )
    ) {
      return res.json({
        message:
          "Password must contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
        ok: false,
      });
    }

    //ReCAPTACH verification
    const verifyReCAPTCHA_token = await verifyReCAPTCHA(token);
    if (!verifyReCAPTCHA_token.ok)
      return res.json({
        message: "Google ReCAPTACH verification failed",
        ok: false,
      });

    if (!verifyReCAPTCHA_token.isHuman)
      return res.json({
        message: "Bot Suspense, redirect 2factAuth",
        ok: false,
      });

    const exsistingUser = await User.findOne({
      "local.personalInfo.email": email,
    });
    if (exsistingUser)
      return res.json({
        message: "User Already Registered, Please Login",
        ok: false,
      });

    const hashPswd = await bcrypt.hash(password, 10);

    const user = await new User({
      method: "local",
      "local.personalInfo": { firstName, lastName, email, password: hashPswd },
    });
    await user.save(); //Saved-User-Data

    //Sending-Confirmation-Email
    await sendEmail(
      email,
      emailTemplates.confirmEmailTemp(user._id, firstName)
    );

    return res.status(201).json({
      message: "Email sent, Please check your inbox to confirm",
      ok: true,
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    return next(errors);
  }
};

module.exports.profileUpdate = async (req, res) => {
  var { userId, personalInfo, educationalInfo, token } = req.body;

  //ReCAPTACH verification
  const verifyReCAPTCHA_token = await verifyReCAPTCHA(token);
  if (!verifyReCAPTCHA_token.ok || !verifyReCAPTCHA_token.isHuman)
    return res.json({
      message: "Google ReCAPTACH verification failed",
      ok: false,
    });

  if (!!personalInfo) {
    personalInfo = JSON.parse(personalInfo);
    Object.keys(personalInfo).forEach((key) => {
      if (personalInfo[key].length === 0) delete personalInfo[key];
    });
  }
  if (!!educationalInfo) educationalInfo = JSON.parse(educationalInfo);

  var profileImage = null;
  if (req.file) profileImage = req.file.path;

  const user = await User.findById(userId);
  if (!user) return res.json({ message: "User not found", ok: false });

  if (!user.local.verification.mobile)
    return res.json({
      message: "Mobile number verification pending, Unable to update profile",
      ok: false,
    });
  var reqInfo = {};
  if (!!personalInfo) {
    reqInfo = Object.fromEntries(
      Object.entries(personalInfo).map(([key, value]) => [
        `local.personalInfo.${key}`,
        value,
      ])
    );
  }

  if (!!educationalInfo && educationalInfo.length > 0)
    reqInfo = { ...reqInfo, "local.educationalInfo": educationalInfo };

  if (!!profileImage)
    reqInfo = {
      ...reqInfo,
      "local.personalInfo.profileImage": profileImage,
    };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { ...reqInfo },
      },
      { returnOriginal: false }
    );
    return res.json({
      message: "Profile Updated",
      ok: true,
      personalInfo: updatedUser.local.personalInfo,
      educationalInfo: updatedUser.local.educationalInfo,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Profile Updation failed" });
  }
};

//Email Confirmation
module.exports.confirmEmail = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: {
        "local.verification.email": true,
      },
    });
    if (!user) return res.json({ message: "User Not found", ok: false });
    if (user.local.verification.email)
      return res.json({
        message: "Email already confirmed, Please Login",
        ok: false,
      });
    const token = createToken(user._id);
    const perInfo = user.local.personalInfo;
    delete perInfo.password;
    return res.status(201).json({
      userId: user._id,
      personalInfo: perInfo,
      educationalInfo: user.local.educationalInfo,
      verification: user.local.verification,
      token,
      ok: true,
      message: "Email Confirmed!! Logging In....",
    });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    return next(errors);
  }
};

//Login Controller
module.exports.login_post = async (req, res, next) => {
  try {
    const { email, password, token } = req.body;
    if (email.length === 0 || password.length === 0)
      return res.json({ message: "Fill All Inputs", ok: false });

    const verifyReCAPTCHA_token = await verifyReCAPTCHA(token);
    if (!verifyReCAPTCHA_token.ok)
      return res.json({
        message: "Google ReCAPTACH verification failed",
        ok: false,
      });

    if (!verifyReCAPTCHA_token.isHuman)
      return res.json({
        message: "Bot Suspense, redirect 2factAuth",
        ok: false,
      });

    const user = await User.login(email, password);
    if (user === "Incorrect Credentials")
      return res.json({ message: user, ok: false });

    if (!user.local.verification.email)
      return res.status(403).json({
        message: "Email not Confirmed. Please check your email account",
        ok: false,
      });
    else {
      const token = createToken(user._id);
      const perInfo = user.local.personalInfo;
      delete perInfo.password;
      return res.status(201).json({
        userId: user._id,
        personalInfo: perInfo,
        educationalInfo: user.local.educationalInfo,
        verification: user.local.verification,
        token,
        ok: true,
        message: "Logged In Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    return next(errors);
  }
};

//Forgot password Controller
module.exports.forgotPassword = (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        var token = buf.toString("hex");
        done(err, token);
      });
    },
    function (token, done) {
      User.findOneAndUpdate(
        { "local.personalInfo.email": req.body.email },
        {
          $set: {
            "local.resetPasswordToken": token,
            "local.resetPasswordExpires": Date.now() + 3600000, //1 hour
          },
        },
        (err, user) => {
          if (!user) {
            return next(new HttpError("No user with that email exists", 404));
          }
          done(err, token, user);
        }
      );
    },
    async (token, user, done) => {
      try {
        //Sending-Reset-Password-Email
        await sendEmail(
          req.body.email,
          emailTemplates.forgotPswdTemp(token, req.body.email)
        );

        return res.status(201).json({
          message: "Email Successfully Sent. Please check your email account",
          ok: true,
        });
      } catch (err) {
        console.log(err);
        const errors = handleErrors(err);
        return next(errors);
      }
    },
  ]);
};

//Reset Password
module.exports.resetPassword = async (req, res, next) => {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;
  if (password.length === 0 || confirmPassoword.length === 0)
    return res.json({ message: "Fill All Inputs", ok: false });
  if (password !== confirmPassword)
    return res.json({ message: "Passwords Not Matching" });

  if (
    !password.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
    )
  ) {
    return res.json({
      message:
        "Password must contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character",
      ok: false,
    });
  }

  try {
    const hashPswd = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      {
        "local.resetPasswordToken": token,
        "local.resetPasswordExpires": { $gt: Date.now() },
      },
      {
        $set: {
          "local.personalInfo.password": hashPswd,
          "local.verification.email": true,
          "local.resetPasswordToken": undefined,
          "local.resetPasswordExpires": undefined,
        },
      }
    );
    if (!user) {
      return next(
        new HttpError("Password reset token has expired or is invalid", 400)
      );
    } else {
      //Sending-Success-Email
      await sendEmail(
        user.local.personalInfo.email,
        emailTemplates.pswdChangeTemp(
          user.local.personalInfo.firstName,
          user.local.personalInfo.email
        )
      );
      res.json({
        message: "Password Successfully Changed",
        ok: true,
      });
    }
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    return next(errors);
  }
};

//get user_details_by_id
module.exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      const jwttoken = createToken(userId);
      const data = {
        userId: userId,
        personalInfo: user.local.personalInfo,
        educationalInfo: user.local.educationalInfo,
        verification: user.local.verification,
        token: jwttoken,
      };
      res.json({ ...data, ok: true });
    } else {
      res.json({ message: "User Not found", ok: false });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Something went wrong", err: error });
  }
};

//recaptcha verification
module.exports.validateCaptcha = async (req, res) => {
  const { token } = req.body;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  //validatingHuman
  try {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      {
        method: "post",
      }
    );
    const data = await response.json();
    const isHuman = data.success;
    if (isHuman) return res.json({ isHuman: true, ok: true });
    else return res.json({ isHuman: false, ok: true });
  } catch (error) {
    console.log(error);
    return res.json({ ok: false });
  }
};

module.exports.mobileNumberVerify = (req, res) => {
  const { mobileNumber } = req.body;
  messagebird.verify.create(
    mobileNumber,
    {
      originator: "Modassir",
      template: "Your verification code is %token.",
    },
    function (err, response) {
      if (err) {
        console.log(err);
        return res.json({ message: err.errors[0].description, ok: false });
      } else {
        return res.json({ id: response.id, ok: true, message: "OTP Sent!!" });
      }
    }
  );
};

module.exports.verifyOTP = (req, res) => {
  const { id, token, userId } = req.body;
  messagebird.verify.verify(id, token, async function (err, response) {
    if (err) {
      console.log(err);
      return res.json({ message: err.errors[0].description, id, ok: false });
    } else {
      const user = await User.findByIdAndUpdate(userId, {
        $set: {
          "local.verification.mobile": true,
        },
      });
      if (!user) return res.json({ message: "User Not found", ok: false });
      return res.json({
        message: "You have successfully verified your phone number.",
        ok: true,
      });
    }
  });
};

module.exports.lastWatched = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    if (!userId || !courseId)
      return res.status(404).json({ message: "ids not found" });
    const getUser = await User.findById(userId);
    if (!getUser) return res.status(404).json({ message: "user not found" });
    getUser.local.lastWatched.courseId = courseId;
    getUser.save();
    return res.status(201).json({ message: "Added last watch" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add last watch", err });
  }
};

module.exports.getLastWatch = async (req, res) => {
  const { userId } = req.params;
  if (userId == null) return res.status(404).json({ message: "Id missing" });
  try {
    const getUser = await User.findById(userId);
    if (!getUser) return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ lastWatched: getUser.local.lastWatched });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to fetch last watch", err });
  }
};
