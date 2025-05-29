const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST api/register
// @desc    Register new user
// @access  Public
router.post('/register', authController.registerUser);

// @route   POST api/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.loginUser);

module.exports = router;