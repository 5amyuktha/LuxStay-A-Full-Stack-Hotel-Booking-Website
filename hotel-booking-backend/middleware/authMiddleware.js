const jwt = require('jsonwebtoken');
// You might need to add this line if you use userModel,
// but ensure it correctly connects to your database/pool
const pool = require('../Database/db'); // Assuming 'db.js' exports a 'pool' object
// If userModel is a custom file with a findUserById function, make sure its path is correct
const userModel = require('../models/userModel'); // Used to fetch user details after verification

// IMPORTANT: Ensure this JWT_SECRET is loaded from your .env file
// Add a console.log here to check its value when the server starts
const JWT_SECRET = process.env.JWT_SECRET;
console.log('AuthMiddleware: JWT_SECRET status:', JWT_SECRET ? 'SET' : 'NOT SET');
if (!JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET is not set in environment variables! Tokens cannot be verified.');
}


const protect = async (req, res, next) => {
    let token;

    // 1. Log the incoming Authorization header
    console.log('AuthMiddleware: Incoming Authorization Header:', req.headers.authorization);

    // Check for token in headers (usually 'Bearer TOKEN')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            console.log('AuthMiddleware: Extracted Token:', token); // Log the extracted token

            // 2. Verify token
            // This is the most common point of failure for "token failed"
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log('AuthMiddleware: Token decoded payload:', decoded); // Log the decoded payload

            // 3. Attach user to the request object (excluding password hash)
            // Ensure decoded.id matches the column name of your user ID (e.g., 'id')
            // If userModel.findUserById uses 'pool' from '../Database/db', ensure it's imported in userModel too.
            // Example of a simple findUserById if you don't have a full model:
            // const userResult = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [decoded.id]);
            // req.user = userResult.rows[0];
            req.user = await userModel.findUserById(decoded.id);

            if (!req.user) {
                console.error('AuthMiddleware: User not found in DB after token verification for ID:', decoded.id);
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }
            console.log('AuthMiddleware: User found and attached to request:', req.user.username);


            next(); // Proceed to the next middleware/route handler
        } catch (error) {
            // This catch block handles errors from jwt.verify and userModel.findUserById
            console.error('AuthMiddleware: Token verification or user lookup error:', error.message);
            // Specifically check for JWT errors
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Not authorized, token expired' });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Not authorized, invalid token' }); // This covers 'invalid signature'
            }
            // Generic error for other issues
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else { // This block handles cases where the Bearer token is missing or malformed in header
        console.log('AuthMiddleware: No token provided or malformed authorization header.');
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = protect;