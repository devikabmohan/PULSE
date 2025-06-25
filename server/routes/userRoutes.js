const express = require('express');
const { getMyIssues} = require('../controller/issueController');
const { getUserProfile } = require('../controller/userController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get user profile
router.get('/profile', auth, getUserProfile);
// Route to get issues reported by the user
router.get('/my-issues', auth, getMyIssues);
module.exports = router;