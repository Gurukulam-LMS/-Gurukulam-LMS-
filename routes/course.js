const express = require("express");
const router = express.Router();
const courseController = require("../controllers/Course");
const Auth = require("../middleware/isAuth");

router.get("/course/:courseId", Auth, courseController.CoursePage);

module.exports = router;
