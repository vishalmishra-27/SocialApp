// auth.js (Route handlers for authentication)
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const JWT_SECRET = 'hithisisvishal';



// Signup endpoint

// Request Format :-
// end-point : http://localhost:2000/api/auth/signup
// type : POST
// Body : {
//     "username": "example_user",
//     "email": "user@example.com",
//     "password": "password123",
//     "bio": "About Myself",
//     "profilePictureUrl" : "C://Pictures/photo.jpg"
//   }
  
router.post('/signup', async (req, res) => {
    // Extract user details from request body
    const { username, email, password, bio, profilePictureUrl } = req.body;

    try {
        // Check if a user with the provided email or username already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email or username already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            bio,
            profilePictureUrl
        });

        // Save user to database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '12h' });

        // Return success message and token
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




// Login endpoint

// Request Format :-
// end-point : http://localhost:2000/api/auth/login
// type : POST
// Body : {
//   "email": "user@example.com",
//   "password": "password123"
// }

router.post('/login', async (req, res) => {
    // Extract credentials from request body
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        // If user not found or password is incorrect, return error
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '12h' });

        // Return token to client
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
