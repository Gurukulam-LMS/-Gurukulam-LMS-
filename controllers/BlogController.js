const Blog = require("../model/Blog");

module.exports.createBlog = async (req, res) => {
  const { title, body } = req.body;
  const topics = JSON.parse(req.body.topics);
  const tags = [];
  tags.push(req.body.tags);
  const image = req.file.location;
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
