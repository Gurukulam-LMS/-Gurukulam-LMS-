const express = require("express");
const router = express.Router();
const courseController = require("../controllers/Course");
const Auth = require("../middleware/isAuth");

router.get("/courses/allcourse", Auth, courseController.allCourses);
router.get("/course/:courseId", Auth, courseController.CoursePage);
router.post("/home/:courseId/:courseName", Auth, courseController.Bookmark);
router.get("/users/:userName/:userId", Auth, courseController.ShowBookmark);
router.post("/unbookmark", Auth, courseController.unbookmark);
router.put("/rating", courseController.rating);

router.get("/pdf/download/:courseId", courseController.pdf);
module.exports = router;
