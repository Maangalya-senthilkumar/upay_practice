const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register (students/teachers only)
router.post('/register', async (req, res) => {
  try {
    const { userId, name, password, role } = req.body;
    if (role === 'admin') return res.status(403).json({ error: 'Cannot register as admin' });
    const existing = await User.findOne({ userId });
    if (existing) return res.status(400).json({ error: 'User ID already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ userId, name, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (all roles)
router.post('/login', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ userId: user.userId, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
