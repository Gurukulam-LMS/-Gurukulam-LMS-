const mongoose = require("mongoose");
const Payments = require("../models/Payment");
const Courses = require("../models/Course");

module.exports.getMyCourses = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(404).json({ message: "userId Not found" });
    const myPayments = await Payments.find({ userId: userId });
    if (!myPayments)
      return res.status(404).json({ message: "No Course Purchased" });
    const myCoursesId = new Set();

    myPayments.map((payment) => {
      payment._doc.courseId.map((course) => {
        myCoursesId.add(course.id);
      });
    });

    const allCourses = await Courses.find({});
    const myCourses = [];
    myCoursesId.forEach((courseId) => {
      allCourses.map((courses) => {
        if (courses._id == courseId) {
          let reqData = JSON.parse(JSON.stringify(courses));
          delete reqData["creator"];
          delete reqData["price"];
          delete reqData["purchased"];
          myCourses.push(reqData);
        }
      });
    });

    return res.status(201).json({ myCourses: myCourses });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Courses Fetching Failed" });
  }
};
