const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  tags: [String],
  date: Date,
  category: String,
  language: String,
  socialNetwork: {
    dribbble: String,
    linkedin: String,
    facebook: String,
    twitter: String
  },
  review: Number
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
