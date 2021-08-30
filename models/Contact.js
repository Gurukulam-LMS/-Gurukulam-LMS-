const mongoose = require("mongoose");
const { isEmail } = require("validator");

const contactSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    validate: [isEmail, "Please enter a valid email"],
  },
  description: String,
});

module.exports = mongoose.model("contact", contactSchema);
