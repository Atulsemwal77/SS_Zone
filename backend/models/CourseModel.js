const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  slug: String,
  thumbnail: String,
  categories: [String],
  regularPrice: Number,
  discountPrice: Number,
  language: String,
  startDate: String,
  requirements: String,
  description: String,
  durationHour: Number,
  durationMinute: Number,
  tags: [String],
  videoUrl: String,
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }]
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);