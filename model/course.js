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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    bookmark: [
      // how many Student have books mark this question
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    courseTopic: [
      {
        topicname: {
          type: String,
          required: false,
        },
        videoUrl: [
          {
            // chnage it to array
            type: String,
            required: false,
          },
        ],
        pdfUrl: [
          {
            // chnage it to array
            type: String,
            required: false,
          },
        ],

        // StudentsWatched: [
        //   // to know the progess of student in any course , it is optional we can remove it if not needed
        //   {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: false,
        //     ref: "Student",
        //   },
        // ],
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
