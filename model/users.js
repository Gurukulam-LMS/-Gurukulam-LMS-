const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const userSchema = new Schema(
  {
    method: {
      type: String,
      enum: ["local", "google", "linkedin"],
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
      usedCoupons: [
        {
          couponId: String,
          finalAmount: String,
        },
      ],
      courseWatchTime: [
        {
          courseId: String,
          watchTime: Number,
        },
      ],
      //student watch time in days sun = index0 , mon = index1, ....
      studentWatchTimeDays: {
        type: Array,
        default: [0, 0, 0, 0, 0, 0, 0],
      },
      lastWatched: {
        courseId: String,
      },
      coursesEnrolled: Array,
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
      id: String,
      token: String,
    },
    linkedin: {
      id: String,
      token: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
