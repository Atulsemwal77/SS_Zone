
const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  duration: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  lessons: {
    type: Number,
  },
  author: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
