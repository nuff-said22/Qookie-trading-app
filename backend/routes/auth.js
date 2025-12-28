const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, role: 'user' }); // Always 'user'
    res.json({ msg: 'Registered' });
  } catch (err) {
    res.status(400).json({ msg: 'Username or email taken' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, 'secret', { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

module.exports = router;