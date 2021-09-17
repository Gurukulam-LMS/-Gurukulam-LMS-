const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
  couponcode: {
    type: String,
    required: true,
    unique: true
  },

  discountpercentage: {
    type: String,
    required: true
  },

  maxstudents: {
    type: String,
    required: true,
  },
  usuage: {
    type: String,
    required: true,
  },
  students: [
    {
      id: String,
    status: String,
    }
  ],
  type: {
    type: String,
    default: "",
  },

  starttime: {
    type: Date,
    default: Date.now,
  },
  expirytime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: "Upcoming",
  }
});

module.exports = mongoose.model("Coupon", CouponSchema);
