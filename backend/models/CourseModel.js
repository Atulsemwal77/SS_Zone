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
  modules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Module" }],

  overviewdescription: {
    type: String,
  },
  whatYouWillLearn: {
    type: String,
  },
  overviewinstructor: {
    type: String,
  },
  videoHours: {
    type: Number,
  },
  courseLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  overviewlanguage: {
    type: String,
    default: "English",
  },
  quizzes: {
    type: Number,
    default: 0,
  },
  certificate: {
    type: Boolean,
    default: false,
  },
  accessOnMobileAndTV: {
    type: Boolean,
    default: true,
  }

}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);