const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  // Validate input data
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    // Create new user
    const user = new User({ name, email, password, isAdmin });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(201).json({ token });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input data
  if (!email || !password) {
    return res.status(400).json({ message: 'Both email and password are required.' });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password match
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
