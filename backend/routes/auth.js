const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User  already exists' });
    }

    // Create a new user
    user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10), 
    });

    await user.save();

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); 
    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and return a JWT token
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' }); 
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;