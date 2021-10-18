const Blog = require("../models/Blog");

module.exports.getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    return res.json({ allBlogs: allBlogs, ok: true });
  } catch (err) {
    console.log(err);
    res.json({ message: "Unable to fetch blog", ok: false });
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const { userName, userEmail, comment, blogId } = req.body;
    if (!userName || !userEmail || !comment || !blogId)
      return res.status(404).json({ message: "Input Missing" });
    const newComment = { userName, userEmail, comment };
    const getBlog = await Blog.findById(blogId);
    if (!getBlog) return res.status(404).json({ message: "Blog not found" });
    getBlog.comments.push(newComment);
    getBlog.save();
    return res
      .status(201)
      .json({ message: "Comment Added", comments: getBlog.comments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add comment", err });
  }
};
