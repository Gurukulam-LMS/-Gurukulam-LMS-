const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
    courseCreated: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
