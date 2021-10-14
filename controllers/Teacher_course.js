const Course = require("../model/course");
const verifyReCAPTCHA = require("../config/googleReCAPTCHA");

exports.uploadCourse = async (req, res, next) => {
  const doc = req.body;
  const imageurl = req.file.location;

  //ReCAPTACH verification
  const verifyReCAPTCHA_token = await verifyReCAPTCHA(doc.token);
  if (!verifyReCAPTCHA_token.ok || !verifyReCAPTCHA_token.isHuman)
    return res.json({
      message: "Google ReCAPTACH verification failed",
      ok: false,
    });

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

exports.updateCourseDetails = async (req, res) => {
  try {
    const doc = req.body;
    console.log(doc);
    if (!doc.courseId)
      return res.status(404).json({ message: "CourseId Not found", ok: false });

    const imageurl = req.file;

    const course = await Course.findById(doc.courseId);
    doc.keyPoints = JSON.parse(doc.keyPoints);

    if (!course)
      return res.status(404).json({ message: "Course Not found", ok: false });

    Object.keys(doc).map((key) => !!doc[key] && (course[key] = doc[key]));

    if (!!imageurl) course.thumbnail = imageurl.location;

    course.save();
    return res.status(201).json({
      message: "Course Updated Successfully",
      ok: true,
      topics: course.courseTopic,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Course Updation Failed" });
  }
};

exports.updateTopicName = async (req, res) => {
  try {
    const { courseId, topicId, topicName } = req.body;
    if (!courseId || !topicId)
      return res.status(404).json({ message: "IDs not found" });

    if (!topicName)
      return res.json(404).json({ message: "Topic Name required", ok: false });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found" });

    const reqTopic = course.courseTopic.find((topic) => topic._id == topicId);
    if (!reqTopic)
      return res.status(404).json({ message: "Topic Not found", ok: false });

    reqTopic.topicname = topicName;
    course.save();
    return res.status(201).json({
      message: "Topic Name Updated",
      ok: true,
      topics: course.courseTopic,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err: err });
  }
};

exports.updateTopicContent = async (req, res) => {
  try {
    const { courseId, topicId } = req.body;
    if (!courseId || !topicId)
      return res.status(404).json({ message: "IDs not found" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found" });

    const reqTopic = course.courseTopic.find((topic) => topic._id == topicId);
    if (!reqTopic)
      return res.status(404).json({ message: "Topic Not found", ok: false });

    const videos = req.files;

    if (!!videos) {
      videos.map((video) => {
        if (video.mimetype === "application/pdf") {
          reqTopic.pdfUrl.push(video.location);
        } else {
          reqTopic.videoUrl.push(video.location);
        }
      });
    }
    course.save();
    return res
      .status(201)
      .json({ message: "Topic Updated", ok: true, topics: course.courseTopic });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Topic Updation failed", ok: false });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const { query } = req.params;
    if (!query)
      return res.status(404).json({ message: "query missing", ok: false });

    const arr = query.split("=");
    const courseId = arr[0];
    const topicId = arr[1];

    if (!courseId || !topicId)
      return res.status(404).json({ message: "IDs not found", ok: false });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found" });

    const reqTopicIdx = course.courseTopic.findIndex(
      (topic) => topic._id == topicId
    );
    if (reqTopicIdx === -1) {
      return res.status(404).json({ message: "Topic Not found" });
    }
    course.courseTopic.splice(reqTopicIdx, 1);
    course.save();
    return res
      .status(200)
      .json({ message: "Topic deleted", ok: true, topics: course.courseTopic });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Topic Deletion failed", ok: false });
  }
};

exports.deleteTopicContent = async (req, res) => {
  try {
    const { query } = req.params;
    const [courseId, topicId, fileIdx, mimeType] = query.split("=");
    if (!courseId || !topicId || !fileIdx || !mimeType)
      return res.status(404).json({ message: "IDs not found", ok: false });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course Not Found" });

    const reqTopic = course.courseTopic.find((topic) => topic._id == topicId);
    if (mimeType === "pdf") {
      reqTopic.pdfUrl.splice(fileIdx, 1);
    } else {
      reqTopic.videoUrl.splice(fileIdx, 1);
    }
    course.save();
    return res.status(200).json({
      message: "Topic file deleted",
      ok: true,
      topics: course.courseTopic,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Topic Video Deletion failed", ok: false });
  }
};
