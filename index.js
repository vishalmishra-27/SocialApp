// index.js (Main entry point of the application)

// Import required modules
const express = require('express');
const connectToMongo = require('./db')

// Create Express application
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB Atlas
connectToMongo();

// Define routes
app.use('/api/profile', require('./Routes/profile'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/posts', require('./Routes/post'));
app.use('/api/follow', require('./Routes/follow'));
app.use('/api/social-feed', require('./Routes/socialFeed'));

app.get('/', (req, res) => {
    res.send('Node JS Assignment 3');
})

// Start the server
const PORT = 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
