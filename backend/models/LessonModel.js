const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  lessonTitle: String,
  lessonContent: String,
  lessonImage: String,
  lessonVideoSource: String,
  lessonHour: Number,
  lessonMinute: Number,
  lessonSecond: Number,
  module: { type: mongoose.Schema.Types.ObjectId, ref: "Module" }
}, { timestamps: true });

module.exports = mongoose.model("Lesson", lessonSchema);