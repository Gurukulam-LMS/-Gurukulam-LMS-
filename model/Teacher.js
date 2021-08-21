const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },

    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
