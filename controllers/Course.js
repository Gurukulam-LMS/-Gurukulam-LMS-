const Course = require("../model/course");

exports.allCourses = (req, res) => {
  Course.find()
    .then((course) => {
      console.log(course);
      res.status(200).json({ course: course });
    })
    .catch((err) => {
      res.json(500).json({ message: "Faile to Fetch Courses " });
      console.log(err);
    });
};

// details for any particular page
exports.CoursePage = (req, res) => {
  // const courseName = req.params.courseName;
  const courseId = req.params.courseId;

  Course.findOne({ _id: courseId })
    .then((course) => {
      res.status(200).json({ course: course });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ err: err, message: "No Course Exits" });
    });
};
// Student can booksmarks any course
exports.Bookmark = (req, res) => {
  const courseId = req.params.courseId;
  const courseName = req.params.courseName;
  const studentID = req.body._studentID;

  Student.findById({ _id: studentID })
    .then((student_found) => {
      if (!student_found.Bookmark.includes(courseId)) {
        student_found.Bookmark.push(courseId);
        console.log("added to bookamrk for student_found");
      } else {
        student_found.Bookmark.splice(
          student_found.Bookmark.indexOf(courseId),
          1
        );
        console.log("removed from student_found bookmark");
      }
      student_found.save().then((result) => {
        Course.findById({ _id: courseId })
          .then((course) => {
            if (!course.bookmark.includes(studentID)) {
              course.bookmark.push(studentID);
              console.log("bookmarked --- course");
            } else {
              course.bookmark.splice(course.bookmark.indexOf(studentID), 1);
            }
            course.save();
            console.log(student_found);
          })
          .catch((err) => {
            console.log(err);
          });
      });

      console.log(student_found);
      res.status(202).json({ message: "successfully bookmarked" });
    })
    .catch((err) => {
      console.log(err);
    });
};
// list all bookmarks of that student
exports.ShowBookmark = (req, res, next) => {
  const studentID = req.params.studentID;
  console.log(studentID);

  Student.findById({ _id: studentID })
    .populate("Bookmark")
    .exec()
    .then((course) => {
      console.log(course);
      res.json({ course: course });
    })
    .catch((err) => {
      console.log(err);
    });
};
// student can unbookmarks courser
exports.unbookmark = (req, res, next) => {
  const studentID = req.body.studentID;
  const courseId = req.body.id;

  Student.findById({ _id: studentID })
    .then((student_found) => {
      student_found.Bookmark.splice(
        student_found.Bookmark.indexOf(courseId),
        1
      );
      student_found.save();
      res.status(200).json({ message: "successfully unbookmarked" });
    })
    .catch((err) => {
      console.log(err);
    });

  Course.findById({ _id: courseId })
    .then((course) => {
      course.bookmark.splice(course.bookmark.indexOf(studentID), 1);
    })
    .catch((err) => {
      console.log(err);
    });
};
// can add rating to course
exports.rating = (req, res, next) => {
  const courseId = req.body.courseId;
  const new_Rating = req.body.rating;

  Course.findById({ _id: courseId })
    .then((course) => {
      const total_rating = course.rating.ratingSum + new_Rating;
      const times_updated = course.rating.timesUpdated + 1;
      course.rating.timesUpdated += 1;
      course.rating.ratingSum += new_Rating;
      course.rating.ratingFinal = total_rating / times_updated;

      course.save();
      console.log(course);
      res.status(200).json({ course: course });
    })
    .catch((err) => {
      res.json(500).json({ message: " Failed to update rating " });
      console.log(err);
    });
};

// Fetch Coursess by category

exports.fetchCourses = (req, res, next) => {
  const category = req.params.course;
  // console.log(category)

  if (category == "all" || category == "") {
    Course.find()
      .then((courses) => {
        // console.log(courses);
        res.status(200).json({ course: courses });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "error occured" });
      });
  } else {
    Course.find({ category: category })
      .then((courses) => {
        //console.log(courses);
        res.status(200).json({ course: courses });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "error occured" });
      });
  }
};
