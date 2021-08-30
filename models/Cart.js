const { Schema, model } = require("mongoose");

const CartSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productsId: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

module.exports = model("cart", CartSchema);
