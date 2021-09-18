require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const oAuthRoutes = require("./routes/oAuthRoutes");
const limiter = require("./middlewares/rateLimiter");
const passport = require("passport");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");
const courseRoutes = require("./routes/courseRoutes");
const cartRoutes = require("./routes/cartRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(express.json());

//CORS Policy
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//Rate-limiter-middleware
app.use(limiter.globalLimiter);

//Initializing Passport
app.use(passport.initialize());
require("./config/passport");

app.use(
  "/uploads/profileImages",
  express.static(path.join("uploads", "profileImages"))
);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/blog", blogRoutes);
app.use("/", oAuthRoutes);

// For any unknown API request
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(500).json({ message: error.message || "Something went wrong" });
});

//Setting up database and backend Server
const PORT = process.env.PORT || 5000;
const CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`MongoDB Connected and Connection started at ${PORT}`);
      console.log(`Local -> http://localhost:${PORT}`);
      console.log(`Client Origin -> ${process.env.CLIENT_ORIGIN}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
