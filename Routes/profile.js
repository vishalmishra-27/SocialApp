// profile.js (Route handlers for profile actions)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const User = require('../Models/User');




// View Profile endpoint

// Request Format :-
// end-point : http://localhost:2000/api/profile
// type : GET
// Header : {
//     "Authorization" : "<insert jsonwebtoken here>"
// }

router.get('/', authMiddleware, async (req, res) => {
  try {
    // Retrieve user profile from the database
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user profile to the client
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Update Profile endpoint

// Request Format :-
// end-point : http://localhost:2000/api/profile
// type : PUT
// Header : {
//     "Content-Type" : "application/json",
//     "Authorization" : "<insert jsonwebtoken here>"
// }
// Body : {
//   "username": "new_username",
//   "bio": "Updated user bio",
//   "profilePictureUrl": "https://example.com/new-profile-picture.jpg"
// }

router.put('/', authMiddleware, async (req, res) => {
  // Extract updated profile data from request body
  const { username, bio, profilePictureUrl } = req.body;

  try {
    // Find user by ID and update profile information
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
      username,
      bio,
      profilePictureUrl
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return updated user profile to the client
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Delete Profile endpoint

// Request Format :-
// end-point : http://localhost:2000/api/profile
// type : DELETE
// Headers : {
  // "Authorization" : "<insert json-web-token here>"
// }

router.delete('/', authMiddleware, async (req, res) => {
  try {
    // Delete user profile from the database
    await User.findByIdAndDelete(req.user.userId); 

    // Return success message to the client
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
