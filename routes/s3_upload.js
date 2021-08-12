const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");

// AWS_ACCESS_KEY_ID=AKIAXTGRGDV7YDSVWSOY
// AWS_SECRET_ACCESS_KEY=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
// USER_ARN  =  arn:aws:iam::522277231999:user/Abhishek

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
  Bucket: process.env.AWS_BUCKET_NAME,
});
// s3.config.httpOptions.timeout = 0;

const fileFilter = (req, file, cb) => {
  console.log("file.mimetype is ", file);
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};
var uploadS3 = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    dirname: "/",
    bucket: "gurukulam",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    contentDisposition: "inline",
    metadata: function (req, file, cb) {
      console.log("File Uploaded    " + file.mimetype);
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "/" + file.originalname);
    },
  }),
});

module.exports = {
  uploadS3,
};
