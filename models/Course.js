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
    thumbnail: {
      type: String,
      require: false,
    },
    tagline: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },

    //What will you learn section
    keyPoints: Array,

    requirement: {
      type: String,
      require: false,
    },
    language: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
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
