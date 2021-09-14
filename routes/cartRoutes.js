const { Router } = require("express");
const router = Router();

const cartController = require("../controllers/cartController");

router.get("/modifyCart/:query", cartController.modifyCart);
router.get("/getCart/:userId", cartController.getCart);

module.exports = router;
