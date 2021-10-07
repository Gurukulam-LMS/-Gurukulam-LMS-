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
router.post(
  "/course/updateCourseDetails",
  imageUpload,
  teacherController.updateCourseDetails
);
router.post(
  "/course/updateTopicContent",
  vedioUpload,
  teacherController.updateTopicContent
);

router.post("/course/updateTopicName", teacherController.updateTopicName);

router.get("/course/deleteTopic/:query", teacherController.deleteTopic);

router.get(
  "/course/deleteTopicContent/:query",
  teacherController.deleteTopicContent
);

module.exports = router;
