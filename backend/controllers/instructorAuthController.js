const Instructor = require('../models/instructorModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const loginInstructorController = (async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingInstructor = await Instructor.findOne({ email });
    if (!existingInstructor) return res.status(404).json({ message: 'Instructor not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingInstructor.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: existingInstructor.email, id: existingInstructor._id,  role: "INSTRUCTOR" }, process.env.JWT_SECRET,{ expiresIn: '1h' });

    res.status(200).json({ result: existingInstructor, token, role: "INSTRUCTOR" });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = loginInstructorController