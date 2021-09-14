const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  adminname: {
    type: String,
    required: true,
    min: 5,
    max: 255,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    min: 6,
    max: 255,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    default: "",
  },

  resetVerified: {
    type: Boolean,
    required: false,
  },
  role: {
    type: String,
    default: "member",
    enum: ["admin", "staff", "member"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  fa2: {
    type: Boolean,
    default: false,
  },
  //Token:String,
  //resetToken:String,
  //resetTokenExpiration:Date,
});

module.exports = mongoose.model("admins", AdminSchema);
