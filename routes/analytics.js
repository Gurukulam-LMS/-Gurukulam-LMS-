const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics");
const Auth = require("../middleware/isAuth");

router.get("/activeUsers", analyticsController.activeUsers);
router.get("/totalRevenue", analyticsController.totalRevenue);
router.get("/topCourses", analyticsController.topCourses);

module.exports = router;
