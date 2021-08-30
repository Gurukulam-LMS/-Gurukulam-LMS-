const Cart = require("../models/Cart");

module.exports.modifyCart = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query)
      return res
        .status(400)
        .json({ message: "userId or productId not found", ok: false });
    const data = query.split("=");
    const userId = data[0];
    const productId = data[1];
    const cartDetails = await Cart.findOne({ userId });
    //If user already exist in collection
    if (!!cartDetails) {
      //Removing from Cart
      let productIdx = cartDetails.productsId.indexOf(userId);
      if (productIdx !== -1) {
        cartDetails.productId.splice(productIdx, 1);
        cartDetails.save();
        return res.json({ message: "Removed from Cart", ok: true });
      }
      //Adding to Cart
      cartDetails.productsId.push(productId);
      cartDetails.save();
      return res.json({ message: "Added to Cart", ok: true });
    }
    //If user not exist in collection
    let productsId = [];
    productsId.push(productId);
    await new Cart({
      userId,
      productsId,
    });
    return res.json({ message: "Added to Cart", ok: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Adding to Cart failed", ok: false });
  }
};
