const { Router } = require("express");
const router = Router();
const blogController = require("../controllers/blogController");

router.get("/getAllBlogs", blogController.getAllBlogs);

module.exports = router;
