// follow.js (Route handlers for following mechanism)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const Follow = require('../Models/Follow');




// Follow User endpoint

// Request Format :-
// end-point : http://localhost:2000/api/follow
// type : POST
// Header : {
//     "Content-Type" : "application/json",
//     "Authorization" : "<insert jsonwebtoken here>"
// }
// Body : {
//   "followedUserId": "65eaf9e099240e0adfd74288"
// }

router.post('/', authMiddleware, async (req, res) => {
    // Extract follower and followed user IDs from request body
    const { followedUserId } = req.body;
    const followerId = req.user.userId;

    try {
        // Create new follow document in the database
        const newFollow = new Follow({
            follower: followerId,
            followedUser: followedUserId
        });
        await newFollow.save();

        // Return success message
        res.status(201).json({ message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Unfollow User endpoint

// Request Format :-
// end-point : http://localhost:2000/api/follow/unfollow
// type : POST
// Header : {
//     "Content-Type" : "application/json",
//     "Authorization" : "<insert jsonwebtoken here>"
// }
// Body : {
//   "followedUserId": "65eaf9e099240e0adfd74288"
// }

router.post('/unfollow', authMiddleware, async (req, res) => {
    // Extract follower and followed user IDs from request body
    const { followedUserId } = req.body;
    const followerId = req.user.userId;

    try {
        // Find and delete follow document from the database
        await Follow.findOneAndDelete({ follower: followerId, followedUser: followedUserId });

        // Return success message
        res.status(200).json({ message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Get Followings endpoint

// Request Format :-
// end-point : http://localhost:2000/api/follow/followings
// type : GET
// Header : {
//     "Authorization" : "<insert jsonwebtoken here>"
// }

router.get('/followings', authMiddleware, async (req, res) => {
    // Extract user ID from request object
    const userId = req.user.userId;

    try {
        // Find follow documents where the follower is the given user
        const followings = await Follow.find({ follower: userId });

        // Extract followed user IDs
        const followedUserIds = followings.map(follow => follow.followedUser);

        // Return followed user IDs as JSON response
        res.status(200).json(followedUserIds);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Get Followers endpoint

// Request Format :-
// end-point : http://localhost:2000/api/follow/followers
// type : GET
// Header : {
//     "Authorization" : "<insert jsonwebtoken here>"
// }

router.get('/followers', authMiddleware, async (req, res) => {
    // Extract user ID from request object
    const userId = req.user.userId;

    try {
        // Find follow documents where the followed user is the given user
        const followers = await Follow.find({ followedUser: userId });

        // Extract follower IDs
        const followerIds = followers.map(follow => follow.follower);

        // Return follower IDs as JSON response
        res.status(200).json(followerIds);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
