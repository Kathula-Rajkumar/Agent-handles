const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Only admin can add agents
router.post('/add', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  const { name, email, mobile, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobile, password: hash, role: 'agent' });
    await user.save();
    res.json({ msg: "Agent added", agent: user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all agents
router.get('/all', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Forbidden' });
  const agents = await User.find({ role: 'agent' }, 'name email mobile');
  res.json(agents);
});

module.exports = router;
