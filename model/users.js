const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");

const UserSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },

  local: {
    personalInfo: {
      firstName: String,
      lastName: String,
      email: {
        type: String,
        validate: [isEmail, "Please enter a valid email"],
        unique: true,
      },
      password: String,
      mobileNumber: String,
      profileImage: String,
      gender: String,
      dob: Date,
      country: String,
      state: String,
      city: String,
    },
    educationalInfo: [
      {
        collage: String,
        startYear: Number,
        endYear: Number,
        degree: String,
      },
    ],
    usedCoupons : [
      {
        couponId: String,
        finalAmount: String
      }
    ],
    verification: {
      email: {
        type: Boolean,
        default: false,
      },
      mobile: {
        type: Boolean,
        default: false,
      },
    },
    secretToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },

  google: {
    id: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("Users", UserSchema);