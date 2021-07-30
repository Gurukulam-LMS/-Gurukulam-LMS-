if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const api_key = require("./config/config");
const path = require("path");

app.use("/images", express.static(path.join(__dirname, "images")));

// To remove CROS (cross-resource-origin-platform) problem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // to allow all client we use *
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*"); // allowed headers (Auth for extra data related to authoriaztiom)
  next();
});

app.use(morgan("dev"));
const mongoose = require("mongoose");
app.use(bodyParser.json());

//=========== routes
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/Teacher");
const courseRoutes = require("./routes/course");

app.use("/admin/auth/", authRoutes);
app.use("/admin/", teacherRoutes);
app.use("/info/", courseRoutes);
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(500).json({ message: error.message || "Something went wrong" });
});

const MONGODB_URI = api_key.mongo;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB! connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
  console.log("Server running on port  http://localhost:" + PORT);
});
