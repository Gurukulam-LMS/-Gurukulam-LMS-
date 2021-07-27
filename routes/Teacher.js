const express = require("express");
const router = express.Router();
const multer = require("multer");
const teacherController = require("../controllers/Teacher_course");
const Auth = require("../middleware/isAuth");

const ImagefileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toDateString() + "-" + file.originalname);
  },
});

const ImagefileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("wrong file type");
  }
};

const VideofileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos");
  },
  filename: (req, file, cb) => {
    const currentDate = new Date();
    cb(null, currentDate.toDateString() + "-" + file.originalname);
  },
});

const VideofileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
    console.log("wrong file type");
  }
};

const imageMulter = multer({
  storage: ImagefileStorage,
  fileFilter: ImagefileFilter,
}).single("image");
const videoMulter = multer({
  storage: VideofileStorage,
  fileFilter: VideofileFilter,
}).any();

router.post(
  "/creator/create-course",
  imageMulter,
  teacherController.uploadCourse
);
router.post(
  "/creator/videoUpload/:courseID",
  videoMulter,
  teacherController.uploadVideo
);

router.post("/creater/homepage", Auth, teacherController.teacherHome);
router.delete("/course/delete", Auth, teacherController.deleteCourse);
router.post("/course/edit", Auth, teacherController.editCourse);
router.put("/course/update", imageMulter, teacherController.updateCourse);

router.post("/watchedByuser", function (req, res) {
  teacherController.watchedByUsers;
});

module.exports = router;
