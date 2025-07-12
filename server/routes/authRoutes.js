import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { signup, login, getProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  console.log('Register endpoint hit. Request body:', req.body);
  try {
    const { name, email, password, location, dateOfBirth, availability, skillsOffered, skillsWanted, profilePhoto } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user with hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      location,
      dateOfBirth,
      availability,
      skillsOffered,
      skillsWanted,
      profilePhoto
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', protect, getProfile);

export default router;
