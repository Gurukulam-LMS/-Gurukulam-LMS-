const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let access_token = req.headers["authorization"];

  if (!access_token) {
    return res.status(401).json({ message: "not authenticated" });
  } else {
    let access = access_token.split(" ")[1];
    let payload;

    try {
      payload = jwt.verify(access, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res.status(500).json({ message: "not authenticated" });
    }

    if (!payload) {
      res.status(401).json({ messages: "not authenticated" });
    }
    //console.log("this is the payload of access token",payload)
    res.AdminID = payload["username"];
    next();
  }
};
