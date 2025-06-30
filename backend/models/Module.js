const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: String,
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
}, { timestamps: true });

module.exports = mongoose.model("Module", moduleSchema);