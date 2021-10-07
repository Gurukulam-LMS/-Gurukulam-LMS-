const { Router } = require("express");
const router = Router();
const dashController = require("../controllers/dashController");

router.post("/getMyCourses", dashController.getMyCourses);

module.exports = router;
