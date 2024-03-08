// socialFeed.js (Route handler for retrieving social feed)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const Post = require('../Models/Post');
const Follow = require('../Models/Follow');




// Get Social Feed endpoint

// Request Format :-
// end-point : http://localhost:2000/api/social-feed/feed
// Header : {
//     "Authorization" : "<insert jsonwebtoken here>"
// }

router.get('/feed', authMiddleware, async (req, res) => {
  // Extract user ID from request object
  const userId = req.user.userId;

  console.log('User ID:', userId); // Log user ID
  
  try {
    // Find users that the current user follows
    const followedUsers = await Follow.find({ follower: userId }).select('followedUser');

    console.log('Followed Users:', followedUsers); // Log followed users
    
    // Extract followed user IDs
    const followedUserIds = followedUsers.map(follow => follow.followedUser);

    console.log('Followed User IDs:', followedUserIds); // Log followed user IDs
    
    // Add current user's ID to the list of followed user IDs
    followedUserIds.push(userId);

    console.log('All User IDs:', followedUserIds); // Log all user IDs
    
    // Aggregate posts from followed users, including the user's own posts
    const socialFeed = await Post.aggregate([
      // Match posts from followed users and the user themselves
      { $match: { $or: [{ user: { $in: followedUserIds } }, { user: userId }] } },
      // Sort posts by timestamp in descending order
      { $sort: { timestamp: -1 } }
    ]);

    console.log('Social Feed:', socialFeed); // Log social feed
    
    // Return social feed as JSON response
    res.status(200).json(socialFeed);
  } catch (error) {
    console.error('Error:', error); // Log error
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
