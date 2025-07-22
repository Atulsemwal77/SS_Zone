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

// Update module title
router.put('/modules/:id', async (req, res) => {
  try {
    const moduleId = req.params.id;
    const { title } = req.body;

    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { title },
      { new: true }
    );

    if (!updatedModule) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.status(200).json({ message: 'Module updated successfully', updatedModule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Delete module and remove from course.modules[]
router.delete('/modules/:id', async (req, res) => {
  try {
    const moduleId = req.params.id;

    // Find the module to get courseId (optional if you store courseId in Module)
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ error: 'Module not found' });

    // Remove module from all courses that include it
    await Course.updateMany(
      { modules: moduleId },
      { $pull: { modules: moduleId } }
    );

    // Delete the module
    await Module.findByIdAndDelete(moduleId);

    res.status(200).json({ message: 'Module deleted successfully' });
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

// UPDATE a lesson
router.put("/lessons/:lessonId", async (req, res) => {
  try {
    const { lessonId } = req.params;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      req.body,
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(updatedLesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a lesson
router.delete("/lessons/:lessonId", async (req, res) => {
  try {
    const { lessonId } = req.params;

    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);
    if (!deletedLesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Only update module if lesson.module exists
    if (deletedLesson.module) {
      await Module.findByIdAndUpdate(deletedLesson.module, {
        $pull: { lessons: lessonId.toString() }
      });
    }

    res.json({ message: "Lesson deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;