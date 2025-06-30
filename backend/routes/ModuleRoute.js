const express = require('express');
const router = express.Router();
const Module = require('../models/Module');
const Lesson = require('../models/LessonModel');
const Course = require('../models/CourseModel');

// Create module and link to course
router.post('/modules', async (req, res) => {
  try {
    const { title, courseId } = req.body;

    const newModule = new Module({ title });
    await newModule.save();

    // Push module into Course.modules[]
    await Course.findByIdAndUpdate(courseId, {
      $push: { modules: newModule._id },
    });

    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add lesson to module
router.post("/modules/:moduleId/lessons", async (req, res) => {
  try {
    const { moduleId } = req.params;
    const lesson = new Lesson({ ...req.body, module: moduleId });
    const savedLesson = await lesson.save();

    await Module.findByIdAndUpdate(moduleId, {
      $push: { lessons: savedLesson._id }
    });

    res.status(201).json(savedLesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;