const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    // Check if the user exists and compare passwords
    if (user && (await user.comparePassword(password))) {
      res.json({ message: 'Signin successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error in signin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
