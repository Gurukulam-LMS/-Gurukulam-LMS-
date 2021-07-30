const Course = require("../model/course");

exports.uploadCourse = (req, res, next) => {
  try {
    console.log(req.body);
    console.log("getting request 1");
    const imageurl = req.file.path;
    const userId = req.body._id;

    console.log("getting request 2");
    const {
      title,
      category,
      name,
      discription,
      discriptionLong,
      requirement,
      price,
    } = req.body;

    const course = new Course({
      title: title,
      category: category,
      imageurl: imageurl,
      name: name,

      discription: discription,
      discriptionLong: discriptionLong,
      requirement: requirement,
      rating: 0,
      price: price,
      creator: userId,
    });
    console.log("getting request 3 " + course);
    course
      .save()
      .then((result) => {
        console.log(result);
        res
          .status(201)
          .json({ message: "Course created successfully", newCourse: result });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

exports.uploadVideo = (req, res, next) => {
  const courseId = req.params.courseID;
  console.log(req.files);
  const videos = req.files;

  let videoContent = [];

  Course.findOne({ _id: courseId })
    .then((course) => {
      videos.forEach((video) => {
        let videoContentContainer = {
          videoUrl: null,
          usersWatched: [],
        };
        videoContentContainer.videoUrl = video.path;
        videoContent.push(videoContentContainer);
      });
      console.log(videoContent);
      course.videoContent = videoContent;
      course.save().then((result) => {
        res.status(200).json({ message: "successfully saved the video" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json(500).json("Failed to upload vedios ");
    });
};

// get courser of any teacher
exports.teacherHome = (req, res, next) => {
  userId = req.body.userId;
  Course.find({ creator: userId })
    .then((course) => {
      res.status(200).json({ data: course });
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete course
exports.deleteCourse = (req, res, next) => {
  const courseId = req.body.courseId;
  console.log("Authentication pass " + courseId);

  Course.findByIdAndRemove({ _id: courseId })
    .then((course) => {
      res.status(200).json({ message: "course deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
};

// editing course
exports.editCourse = (req, res, next) => {
  const courseId = req.body.courseId;

  Course.findOne({ _id: courseId })
    .then((course) => {
      res.status(200).json({ course });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateCourse = (req, res, next) => {
  console.log("getting req to update course ");
  const courseId = req.body.courseId;
  const title = req.body.title;
  const category = req.body.category;
  const imageurl = "new file link";
  const name = req.body.name;

  const discription = req.body.discription;
  const discriptionLong = req.body.discriptionLong;
  const requirement = req.body.requirement;
  const price = req.body.price;
  //const userId=req.body._id;

  Course.findById({ _id: courseId })
    .then((course) => {
      course.title = title;
      course.category = category;
      course.imageurl = imageurl;
      course.name = name;

      course.discription = discription;
      course.discriptionLong = discriptionLong;
      course.requirement = requirement;
      course.rating = 0;
      course.price = price;

      course.save();
      res.status(201).json({ message: "Course editted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update course " });
    });
};
