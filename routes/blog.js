const { Router } = require("express");
const router = Router();
const { uploadS3 } = require("./s3_upload");
const imageUpload = uploadS3.single("image");

const blogController = require("../controllers/BlogController");

router.post("/createBlog", imageUpload, blogController.createBlog);

module.exports = router;
