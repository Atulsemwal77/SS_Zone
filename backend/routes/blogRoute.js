// const express = require("express");
// const router = express.Router();
// const Blog = require("../models/blogModel");

// // Create new blog
// router.post("/addblogs", async (req, res) => {
//   try {
//     const blog = new Blog(req.body);
//     const savedBlog = await blog.save();
//     res.status(201).json(savedBlog);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Get all blogs
// router.get("/getblogs", async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ date: -1 }); // newest first
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const upload = require("../multer")
const path = require('path');
const blogController = require('../controllers/blogController');


// Routes
router.post('/', upload.single('image'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.put('/blogs/:id', upload.single('image'), blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);
// router.get('/:id', blogController.getBlogById);

module.exports = router;
