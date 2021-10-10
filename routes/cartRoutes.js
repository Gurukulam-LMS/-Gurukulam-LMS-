const { Router } = require("express");
const router = Router();

const cartController = require("../controllers/cartController");

router.get("/modifyCart/:query", cartController.modifyCart);
router.post("/getCart", cartController.getCart);
router.get("/clearCart/:userId", cartController.clearCart);

module.exports = router;
