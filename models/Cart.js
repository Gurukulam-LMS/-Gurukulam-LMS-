const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  coursesId: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("cart", cartSchema);
