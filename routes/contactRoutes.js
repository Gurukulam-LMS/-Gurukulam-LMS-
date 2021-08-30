const { Router } = require("express");
const router = Router();
const contactController = require("../controllers/contactController");

router.post("/contact", contactController.contact);

module.exports = router;
