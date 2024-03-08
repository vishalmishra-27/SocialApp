// post.js (Route handlers for post management)
const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const Post = require('../Models/Post');




// Create Post endpoint

// Request Format :-
// end-point : http://localhost:2000/api/posts
// type : POST
// Header : {
//     "Content-Type" : "application/json",
//     "Authorization" : "<insert jsonwebtoken here>"
// }
// Body : {
//   "content": "This is a test post"
// }

router.post('/', authMiddleware, async (req, res) => {
    // Extract post data from request body
    const { content } = req.body;

    try {
        // Create new post with current timestamp and user ID
        const newPost = new Post({
            content,
            timestamp: new Date(),
            user: req.user.userId
        });

        // Save new post to the database
        await newPost.save();

        // Return newly created post as JSON response
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Read Own Posts endpoint

// Request Format :-
// end-point : http://localhost:2000/api/posts/myposts
// type : GET
// Header : {
//     "Authorization" : "<insert jsonwebtoken here>"
// }

router.get('/myposts', authMiddleware, async (req, res) => {
    try {
        // Extract user ID from request object
        const userId = req.user.userId;

        // Retrieve posts of the current user from the database
        const userPosts = await Post.find({ user: userId }).sort({ timestamp: -1 });

        // Return user's posts as JSON response
        res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Update Post endpoint

// Request Format :-
// end-point : http://localhost:2000/api/posts/<insert post id here>
// type : PUT
// Header : {
//     "Content-Type" : "application/json",
//     "Authorization" : "<insert jsonwebtoken here>"
// }
// Body : {
//   "content": "This is my updated post"
// }

router.put('/:postId', authMiddleware, async (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;

    try {
        // Find post by ID
        let post = await Post.findById(postId);

        // Check if post exists
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if user owns the post
        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'You are not authorized to update this post' });
        }

        // Update post content
        post.content = content;
        await post.save();

        // Return updated post as JSON response
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Delete Post endpoint

// Request Format :-
// end-point : http://localhost:2000/api/posts/<insert post id here>
// type : DELETE
// Header : {
//     "Authorization" : "<insert jsonwebtoken here>"
// }

router.delete('/:postId', authMiddleware, async (req, res) => {
    const postId = req.params.postId;

    try {
        // Find post by ID
        let post = await Post.findById(postId);
        
        // Check if post exists
        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ error: 'Post not found' });
        }
        
        
        // Check if user owns the post
        if (post.user.toString() !== req.user.userId) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' });
        }
        
        // Delete post from the database
        await post.deleteOne();
        
        // Return success message
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
