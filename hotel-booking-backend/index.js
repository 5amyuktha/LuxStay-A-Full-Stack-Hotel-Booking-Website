require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Import authentication routes and middleware
const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware'); // Your new middleware
const pool = require('./Database/db'); // Your existing DB pool export

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Test route to check DB connection and JWT config
app.get('/api/test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ dbTime: result.rows[0].now, jwtSecret: process.env.JWT_SECRET ? 'set' : 'not set' });
    } catch (error) {
        console.error('Test route error:', error);
        res.status(500).json({ message: 'DB connection test failed' });
    }
});

// Use authentication routes
app.use('/api/auth', authRoutes); // All auth routes will be prefixed with /api/auth

// ✅ Route to get all rooms (Public, no protection)
app.get('/api/rooms', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM rooms ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ message: 'Failed to fetch rooms' });
    }
});

// ✅ Route to get single room by ID (Public, no protection)
app.get('/api/rooms/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM rooms WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ message: 'Failed to fetch room' });
    }
});

// ✅ NEW: Route to create a booking (PROTECTED)
// This route now expects 'name' and 'email' from the frontend body
app.post('/api/bookings', protect, async (req, res) => {
    try {
        // We are no longer using req.user.id for the booking itself,
        // but the 'protect' middleware still ensures the user is logged in.
        const { room_id, name, email, check_in, check_out, guests } = req.body;

        if (!room_id || !name || !email || !check_in || !check_out || !guests) {
            return res.status(400).json({ message: 'Missing required booking fields' });
        }

        // IMPORTANT: Ensure your 'bookings' table in PostgreSQL has 'name' and 'email' columns
        // and DOES NOT have a 'user_id' column if you want to strictly match this.
        // If it *does* have user_id, you might want to include it, or remove it from your table.

        const result = await pool.query(
            `INSERT INTO bookings (room_id, name, email, check_in, check_out, guests, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, NOW())
             RETURNING *`,
            [room_id, name, email, check_in, check_out, guests] // Use name and email from req.body
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});