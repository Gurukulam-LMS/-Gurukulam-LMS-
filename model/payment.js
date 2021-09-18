const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  couponId: {
    type: String,
    required: true
  },

  amount: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  courseId: [
    {
      id: String
    }
  ],
  razorpayOrderId: {
    type: String
  },

  razorpayPaymentId: {
    type: String
  },
  orderCreationId: {
    type: String
  }
});

module.exports = mongoose.model("Payment", PaymentSchema);
