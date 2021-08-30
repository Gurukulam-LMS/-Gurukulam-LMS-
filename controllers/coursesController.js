const mongoose = require("mongoose");
const Courses = mongoose.model("Course", new mongoose.Schema(), "courses");

module.exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Courses.find({});
    if (!allCourses)
      return res.json({ message: "Course not found", ok: false });
    let reqDetails = [];
    allCourses.forEach((course) => {
      let courseDetails = Object.assign({}, course)._doc;
      courseDetails.totalLectures = courseDetails.courseTopic.length;
      delete courseDetails.courseTopic;
      delete courseDetails.creator;
      reqDetails.push(courseDetails);
    });
    return res.json({ allCourses: reqDetails, ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Something went wrong", ok: false });
  }
};
