if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const api_key = require("./config/config");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

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
const couponRoutes = require("./routes/coupon");
const paymentRoutes = require("./routes/payment");

app.use("/coupon", couponRoutes);
app.use("/payment", paymentRoutes);
app.use("/admin/auth/", authRoutes);
app.use("/admin/", teacherRoutes);
app.use("/info/", courseRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(500).json({ message: error.message || "Something went wrong" });
});

//Setting up database and backend Server
const PORT = process.env.PORT || 8000;
const CONNECTION_URL = process.env.MONGO_DATABASE;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB Connected and Connection started at ${PORT}`);
      console.log(`Local -> 🌎🌏 http://localhost: ${PORT}`);
      console.log(`Client Origin -> ${process.env.CLIENT_ORIGIN}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });