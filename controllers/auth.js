const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const OTP = require("../model/Otp");
const crypto = require("crypto");
const { sendverficationLink } = require("../services/sendverficationLink");
const { Sendotp } = require("../services/Sendotp");
// const nodemailer = require('nodemailer');
// const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require("express-validator");
const api_key = require("../config/config");

const crypto_encoder = () => {
  return crypto.randomBytes(17).toString("hex");
};

const getopt = () => Math.floor(Math.random() * 1000000);

exports.newAdmin = async (req, res, next) => {
  console.log(req);
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const adminname = req.body.adminname;
  const role = req.body.role;
  console.log(email, password, confirmPassword, adminname, role);
  console.log(req.body);
  if (req.body.admin.role !== "super-admin") {
    return res.status(401).json("Authorization Fail  ");
  }

  if (password != confirmPassword)
    return res
      .status(401)
      .json("Password and confirm password should be same ");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();

    res.status(422).json({ message: errors.array() });
  } else {
    try {
      await bcrypt.hash(password, 12).then(async (hashedPassword) => {
        const newAdmin = new Admin({
          email: email,
          password: hashedPassword,
          isActive: false,
          adminname: adminname,
          role: role,
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin Created successfully " });
      });
    } catch (err) {
      if (err) {
        const obj = err.keypattern;

        console.log(obj);
        res.status(409).json({
          message: `${obj} already exits `,
          err,
        });
      } else {
        res.status(500).json({
          message: "Something went wrong ",
        });
      }
    }
  }
};

exports.verifyToken = (req, res, next) => {
  const { token } = req.params;
  //  const token=req.body.token;
  const { email } = req.params;
  console.log(token, email);
  // validation

  Admin.findOne({ email: email })
    .then(async (admin_found) => {
      if (!admin_found) {
        return res.status(422).json({
          message: "Validation failed ,wrong verification link or expire",
          verified: false,
        });
      }

      if (admin_found.verificationToken !== token) {
        return res.status(401).json({ message: "Invalid verification Link " });
      } else {
        await admin_found.updateOne({
          $set: { resetVerified: true },
        });

        await admin_found.save();
        return res.status(200).json({
          message: "User verified to reset password ",
          verified: true,
        });
      }
    })
    .catch((err) => {
      console.log("Getting error ");
      return res
        .status(500)
        .json({ message: "Invalid verification  link ", verified: false });
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ message: "Invalid Credentials" });
  }

  Admin.findOne({ email: email })
    .then((admin_found) => {
      if (!admin_found) {
        res.status(401).json("Invalid email id ");
      }

      bcrypt.compare(password, admin_found.password).then(async (matchPass) => {
        if (matchPass) {
          // check wether use is using 2fa or not
          const is2FA = admin_found.fa2;
          if (is2FA) {
            const new_otp = getopt();
            // then send otp
            const set_otp = {
              $set: { otp: new_otp.toString(), email: email },
            };

            // insert document if not present otherwise create new doc
            const otp_doc = await OTP.findOneAndUpdate(
              { email: email },
              set_otp,
              { new: true, upsert: true, setDefaultsOnInsert: true }
            );
            console.log(set_otp);
            Sendotp(email, new_otp, admin_found.adminname);
            res.status(201).json({ message: "Otp send", otp: otp_doc });
          } else {
            const access_token = jwt.sign(
              { id: admin_found.id },
              api_key.accessToken,
              {
                algorithm: "HS256",
                expiresIn: api_key.accessTokenLife,
              }
            );

            const referesh_token = jwt.sign(
              { id: admin_found.id },
              api_key.refereshToken,
              {
                algorithm: "HS256",
                expiresIn: api_key.refereshTokenLife,
              }
            );

            // admin_found.Token=token;
            // admin_found.save()
            const { adminname, email, role } = admin_found;
            res.status(201).json({
              message: " logged in  Successfully ",
              access_token: access_token,
              referesh_token: referesh_token,
              Admin: { adminname, email, role },
              adminId: admin_found._id.toString(),
              ok: true,
            });
            console.log("admin login successfully ");
          }
        } else {
          res.status(402).json({ message: "password don't match" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ message: "login fail ", error: err });
    });
};

exports.fa2_auth = (req, res, next) => {
  try {
    const email = req.body.email;
    Admin.findOne({ email: email }).then(async (admin_found) => {
      if (!admin_found) {
        res.status(401).json("Invalid email id ");
      }

      const fa2_status = admin_found.fa2;
      console.log("before ", fa2_status, email);
      const updated_admin = await Admin.findOneAndUpdate(
        { email: email },
        {
          $set: { fa2: !fa2_status },
        },
        { new: true }
      );
      res.status(201).json(updated_admin);
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal Server Error || Something went wrong  " });
  }
};

exports.forgot_Password = async (req, res, next) => {
  const email = req.body.email;
  console.log("getting forgot_password request " + email);
  let token = crypto_encoder();
  console.log(token);

  Admin.findOne({ email: email })
    .then(async (admin_found) => {
      if (!admin_found) {
        res.status(422).json({ message: " User doesn't exists" });
      } else {
        admin_found.verificationToken = token;

        await admin_found.save();
      }
    })

    .then(async () => {
      await sendverficationLink(email, token);
      res.status(201).json({
        message: "Reset password verification link send  ",
        send: true,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.otpVerification = async (req, res, next) => {
  const receivedOtp = req.body.otp;
  const email = req.body.email;
  console.log(email, receivedOtp);

  OTP.findOne({ email: email })
    .then(async (admin_found) => {
      if (!admin_found) {
        const error = new Error("Validation failed ,this otp does not exist"); // when token not found
        error.statusCode = 403;
        error.data = {
          value: receivedOtp,
          message: "Invalid email",
          param: "otp",
          location: "otpVerification",
        };

        return res.status(422).json({ message: errors.array() });
      }

      if (admin_found.otp != receivedOtp) {
        res.status(401).json({ message: "wrong otp entered " });
      } else {
        await OTP.findByIdAndRemove({ _id: admin_found._id });
        //  correct OTP
        Admin.findOne({ email: email }).then((admin_found) => {
          const access_token = jwt.sign(
            { email: admin_found.email },
            api_key.accessToken,
            {
              algorithm: "HS256",
              expiresIn: api_key.accessTokenLife,
            }
          );

          const referesh_token = jwt.sign(
            { email: admin_found.email },
            api_key.refereshToken,
            {
              algorithm: "HS256",
              expiresIn: api_key.refereshTokenLife,
            }
          );

          admin_found.save((result) => {
            return res.status(200).json({
              message: "otp entered is correct, admin_found successfully login",
              access_token: access_token,
              referesh_token: referesh_token,
              userId: admin_found._id.toString(),
              username: admin_found.adminname,
            });
          });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.newPassword = (req, res, next) => {
  const email = req.body.email;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  let resetAdmin;

  if (newPassword !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Confirm Password should matches with new Password " });

  Admin.findOne({ email: email })
    .then(async (admin_found) => {
      if (!admin_found) {
        res
          .status(401)
          .json({ message: "Admin with this email doesnt exists" });
      }

      if (admin_found.resetVerified) {
        resetAdmin = admin_found; // assign Admin

        await admin_found.updateOne({
          $set: { verificationToken: "", resetVerified: false },
        });

        return bcrypt
          .hash(newPassword, 12)
          .then((hashedPassword) => {
            resetAdmin.password = hashedPassword;
            return resetAdmin.save();
          })

          .then((result) => {
            res.status(201).json({ message: "password changed successfully" });
          });
      } // end of if condition
      else {
        res
          .status(401)
          .json({ message: "admin_found is not password reset verified " });
      }
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
