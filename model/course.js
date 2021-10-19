const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: [
      {
        type: String,
      },
    ],
    thumbnail: {
      type: String,
    },
    tagline: {
      type: String,
    },
    description: {
      type: String,
    },

    //What will you learn section
    keyPoints: Array,

    requirement: {
      type: String,
    },
    language: {
      type: String,
    },
    price: {
      type: String,
    },
    level: {
      type: String,
    },
    creator: {
      //for refrencing the person who created it

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

    purchased: {
      type: Number,

      default: 0,
    },

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
        //     type: Schema.Types.ObjectId,
        //     required: false,
        //     ref: "Student",
        //   },
        // ],
      },
    ],
    rating: {
      ratingSum: {
        type: Number,

        default: 1,
      },
      timesUpdated: {
        type: Number,

        default: 1,
      },
      ratingFinal: {
        type: Number,

        default: 1,
      },
    },
    totalDuration: {
      type: Number,

      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
