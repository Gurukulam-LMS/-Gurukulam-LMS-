const Cart = require("../models/Cart");

module.exports.modifyCart = async (req, res) => {
  try {
    const { query } = req.params;

    if (!query)
      return res
        .status(400)
        .json({ message: "userId or courseId not found", ok: false });
    const data = query.split("=");
    const userId = data[0];
    const courseId = data[1];
    if (!userId || !courseId)
      return res
        .status(400)
        .json({ message: "userId or courseId not found", ok: false });
    const cartDetails = await Cart.findOne({ userId });

    //If user already exist in collection
    if (!!cartDetails) {
      //Removing from Cart
      let courseIdx = cartDetails.coursesId.indexOf(courseId);
      if (courseIdx !== -1) {
        cartDetails.coursesId.splice(courseIdx, 1);
        cartDetails.save();
        return res.json({
          message: "Removed from Cart",
          ok: true,
          cart: cartDetails.coursesId,
        });
      }
      //Adding to Cart
      cartDetails.coursesId.push(courseId);
      cartDetails.save();
      return res.json({
        message: "Added to Cart",
        ok: true,
        cart: cartDetails.coursesId,
      });
    }
    //If user not exist in collection
    let productsId = [];
    productsId.push(courseId);
    const newCart = await new Cart({
      userId,
      coursesId: productsId,
    });
    await newCart.save();
    return res.json({
      message: "Added to Cart",
      ok: true,
      cart: productsId,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Adding to Cart failed", ok: false });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(404).json({ message: "userId not found" });
    const cartDetails = await Cart.findOne({ userId });
    if (!cartDetails)
      return res.json({ message: "User no found", ok: false, cart: [] });
    return res.json({ cart: cartDetails.coursesId, ok: true });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Cart details failed", ok: false });
  }
};
