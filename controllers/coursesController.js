const mongoose = require("mongoose");
const Courses = mongoose.model("Course", new mongoose.Schema(), "courses");

module.exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Courses.find({});
    return res.json({ allCourses, ok: true });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Something went wrong", ok: false });
  }
};