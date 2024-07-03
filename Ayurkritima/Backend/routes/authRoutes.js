const express = require('express');
const router = express.Router();
const { signup, signin, logout, userProfile,sendotp } = require('../controllers/authController');
const { isAuthenticated } = require('../middleware/auth');


//auth routes
// /api/signup
router.post('/signup', signup);
// /api/signin
router.post('/signin', signin);
router.post('/sendotp', sendotp);
// /api/logout
router.get('/logout', logout);

// /api/me
router.get('/me', isAuthenticated, userProfile);

module.exports = router;