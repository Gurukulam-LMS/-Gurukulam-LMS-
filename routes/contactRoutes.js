const { Router } = require("express");
const router = Router();
const contactController = require("../controllers/contactController");

router.post("/", contactController.contact);

module.exports = router;
