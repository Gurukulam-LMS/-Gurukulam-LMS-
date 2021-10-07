const mongoose = require("mongoose");
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
