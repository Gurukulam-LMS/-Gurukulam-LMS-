const { Schema, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: String,
    image: String,
    body: String,
    topics: [
      {
        topicName: String,
        topicBody: String,
      },
    ],
    tags: Array,
    comments: [
      {
        userId: Schema.Types.ObjectId,
        userName: String,
        userEmail: String,
        comment: String,
        commentDate: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("blog", BlogSchema);
