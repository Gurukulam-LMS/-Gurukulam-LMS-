const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/Teacher_course");
const Auth = require("../middleware/isAuth");
const { uploadS3 } = require("./s3_upload");

const imageUpload = uploadS3.single("image");
const vedioUpload = uploadS3.array("videoFile");
router.post(
  "/creator/create-course",
  imageUpload,
  teacherController.uploadCourse
);

router.post(
  "/creator/videoUpload/:courseID",
  vedioUpload,
  teacherController.uploadVideo
);

router.post("/creater/homepage", Auth, teacherController.teacherHome);
router.delete("/course/delete", Auth, teacherController.deleteCourse);
router.post("/course/edit", Auth, teacherController.editCourse);
router.put("/course/update", Auth, imageUpload, teacherController.updateCourse);

router.post("/watchedByuser", function (req, res) {
  teacherController.watchedByUsers;
});

module.exports = router;
