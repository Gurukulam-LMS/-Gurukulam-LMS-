const Course = require("../model/course");

exports.uploadCourse = (req, res, next) => {
  const doc = req.body;
  const imageurl = req.file.location;

  const course = new Course({
    title: doc.title,
    category: doc.category,
    thumbnail: imageurl,
    description: doc.description,
    requirement: doc.requirement,
    rating: 0,
    price: doc.price,
    creator: doc.creatorId,
    tagline: doc.tagline,
    language: doc.language,
    keyPoints: JSON.parse(doc.keyPoints),
    level: doc.level,
  });

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
};

exports.uploadVideo = (req, res, next) => {
  const courseId = req.params.courseID;

  const videos = req.files;
  console.log(videos);

  const topicname = req.body.topicname;
  let newTopic = {
    topicname: "",
    pdfUrl: [],
    videoUrl: [],
  };

  Course.findOne({ _id: courseId })
    .then((course) => {
      console.log("course found ");
      newTopic.topicname = topicname;
      videos.forEach((video) => {
        if (video.mimetype === "application/pdf") {
          newTopic.pdfUrl.push(video.location);
        } else {
          newTopic.videoUrl.push(video.location);
        }
      });
      console.log(newTopic);
      console.log(course);
      course.courseTopic.push(newTopic);
      course.save().then((result) => {
        console.log(course);
        res.status(200).json(course);
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json("Failed to upload vedios ");
    });
};

// get courses of any teacher
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
  const imageurl = req.file.location; // later remove this text
  const name = req.body.name;

  const discription = req.body.discription;
  const discriptionLong = req.body.discriptionLong;
  const requirement = req.body.requirement;
  const price = req.body.price;
  //const userId=req.body._id;

  Course.findById({ _id: courseId })
    .then(async (course) => {
      course.title = title;
      course.category = category;
      course.imageurl = imageurl;
      course.name = name;

      course.discription = discription;
      course.discriptionLong = discriptionLong;
      course.requirement = requirement;
      course.rating = 0;
      course.price = price;

      await course.save();
      res.status(201).json({ message: "Course editted successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Failed to update course " });
    });
};
