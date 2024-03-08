// authMiddleware.js (Middleware for JWT token extraction)
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'hithisisvishal';

const authMiddleware = (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization');

    // Check if token is provided
    if (!token) {
        return res.status(401).json({ error: 'Authorization token not provided' });
    }

    try {
        // Verify token and extract user ID
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
