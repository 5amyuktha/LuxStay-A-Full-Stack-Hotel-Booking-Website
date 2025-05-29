const pool = require('../Database/db'); // Your existing DB pool

async function createUser(username, email, passwordHash) {
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, passwordHash]
    );
    return result.rows[0];
}

async function findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

async function findUserById(id) {
    const result = await pool.query('SELECT id, username, email FROM users WHERE id = $1', [id]);
    return result.rows[0];
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
};