const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  itemPurchased: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
});

module.exports = mongoose.model("User", userSchema);
