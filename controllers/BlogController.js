const Blog = require("../model/Blog");
const verifyReCAPTCHA = require("../config/googleReCAPTCHA");

module.exports.createBlog = async (req, res) => {
  const { title, body, token } = req.body;

  //ReCAPTACH verification
  const verifyReCAPTCHA_token = await verifyReCAPTCHA(token);
  if (!verifyReCAPTCHA_token.ok || !verifyReCAPTCHA_token.isHuman)
    return res.json({
      message: "Google ReCAPTACH verification failed",
      ok: false,
    });

  let topics = null;
  if (!!req.body.topics) {
    topics = JSON.parse(req.body.topics);
  }
  const tags = [];
  tags.push(req.body.tags);
  let image = null;
  if (!!req.file) {
    image = req.file.location;
  }
  try {
    const newBlog = await new Blog({
      title,
      body,
      image,
      topics,
      tags,
    });
    await newBlog.save();
    return res.status(201).json({ message: "Blog Created", ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Blog Creation failed", ok: false });
  }
};
