const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    category: [
      {
        type: String,
        require: true,
      },
    ],
    imageurl: {
      type: String,
      require: false,
    },

    discription: {
      type: String,
      require: true,
    },
    //optional if we want to detailed info for course
    discriptionLong: {
      type: String,
      require: false,
    },
    requirement: {
      // pre-requirement to learn this courses
      type: String,
      require: false,
    },
    price: {
      type: String,
      required: false,
    },
    creator: {
      //for refrencing the person who created it
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    bookmark: [
      // how many Student have books mark this question
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    videoContent: [
      {
        videoUrl: {
          type: String,
          required: false,
        },
        StudentsWatched: [
          // like how many Student watched this vedio , it is optional we can remove it if not needed
          {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Student",
          },
        ],
      },
    ],
    rating: {
      ratingSum: {
        type: Number,
        required: false,
        default: 1,
      },
      timesUpdated: {
        type: Number,
        require: false,
        default: 1,
      },
      ratingFinal: {
        type: Number,
        require: false,
        default: 1,
      },
    },
    totalDuration: {
      type: Number,
      required: true,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
