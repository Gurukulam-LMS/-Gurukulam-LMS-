const { Router } = require("express");
const router = Router();
const blogController = require("../controllers/blogController");

router.get("/getAllBlogs", blogController.getAllBlogs);
router.post("/addComment", blogController.addComment);

module.exports = router;
