const Admin = require('../models/adminModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const loginAdminController = (async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) return res.status(404).json({ message: 'admin not found' });

    const isPasswordCorrect = await bcrypt.compare(password, existingAdmin.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: existingAdmin.email, id: existingAdmin._id, role: "ADMIN" }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ result: existingAdmin, token, role: "ADMIN" });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = loginAdminController