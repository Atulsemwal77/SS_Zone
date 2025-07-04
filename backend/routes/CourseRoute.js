const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Course = require('../models/CourseModel');

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // make sure 'uploads' exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const upload = multer({ storage });

// CREATE course
router.post('/create', upload.single('thumbnail'), async (req, res) => {
  try {
    const {
      title,
      slug,
      description,
      regularPrice,
      discountPrice,
      categories
    } = req.body;

    const newCourse = new Course({
      title,
      slug,
      description,
      regularPrice,
      discountPrice,
      categories: JSON.parse(categories),
      thumbnail: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
    });

    const saved = await newCourse.save();
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create course' });
  }
});
// Add this route in your courseroutes.js
router.post('/:id/additional-info', async (req, res) => {
  try {
    const {
      language,
      startDate,
      requirements,
      description,
      durationHour,
      durationMinute,
      tags,
    } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        language,
        startDate,
        requirements,
        description,
        durationHour,
        durationMinute,
        tags: JSON.parse(tags),
      },
      { new: true }
    );

    res.json(updatedCourse);
  } catch (err) {
    console.error('Error updating additional info:', err);
    res.status(500).json({ message: 'Error updating course additional info' });
  }
});


// Update video URL
router.post('/:id/upload-video', async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { videoUrl },
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading video', error: err.message });
  }
});

router.get('/all/full', async (req, res) => {
  try {
    const allCourses = await Course.find().sort({createdAt:-1})
      .populate({
        path: 'modules',
        populate: { path: 'lessons' }
      });
      
    res.json(allCourses);
  } catch (err) {
    console.error("❌ Error in /api/courses/all/full:", err); // This will help debug
    res.status(500).json({ message: "Error getting course", error: err.message });
  }
});

// Get full course with modules and lessons populated
router.get('/:id/full', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({
        path: 'modules',
        populate: {
          path: 'lessons'
        }
      });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (err) {
    console.error('Error fetching full course:', err);
    res.status(500).json({ message: 'Error getting course' });
  }
});






module.exports = router;