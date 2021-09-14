const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
    usedCoupons: [
      {
        couponId: String,
        finalAmount: String,
      },
    ],
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

//incrypting password
userSchema.pre("save", async function (next) {
  if (this.method != "local") next();
  const salt = await bcrypt.genSalt(10);
  const password = this.local.personalInfo.password;
  this.local.personalInfo.password = await bcrypt.hash(password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ "local.personalInfo.email": email });
  if (user) {
    const auth = await bcrypt.compare(
      password,
      user.local.personalInfo.password
    );
    if (auth) return user;
  }
  return "Incorrect Credentials";
};

const User = mongoose.model("user", userSchema);

module.exports = User;
