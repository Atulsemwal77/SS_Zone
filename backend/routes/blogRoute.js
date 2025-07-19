const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");

// Create new blog
router.post("/addblogs", async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all blogs
router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 }); // newest first
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
