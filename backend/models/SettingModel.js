const mongoose = require('mongoose');

const stetingSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  userName: {
    type: String,
    trim: true
  },
  phoneNumber: {
    type: String,
  },
  skill: {
    type: String,
  },
  displayNamePubliclyAs: {
    type: String,
  },
  bio: {
    type: String,
  },
},
  { timestamps: true }
);

module.exports = mongoose.model('Setting', stetingSchema);