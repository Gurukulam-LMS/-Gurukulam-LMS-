const RateLimit = require("express-rate-limit");

module.exports.globalLimiter = new RateLimit({
  max: 100,
  windowMs: 10 * 60 * 1000, //10mins
  message: "Too many request, Please try again after some time",
});

module.exports.postReqLimiter = new RateLimit({
  max: 100,
  windowMs: 24 * 60 * 60 * 1000, //24 hrs
  message: "Too many request, Please try again after some time",
});
