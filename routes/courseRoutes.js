const { Router } = require("express");
const router = Router();
const courseController = require("../controllers/coursesController");

router.get("/getAllCourses", courseController.getAllCourse);

module.exports = router;
