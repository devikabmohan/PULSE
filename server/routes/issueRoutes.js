const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({dest:'uploads/'})

const {createIssue, getAllIssues, updateIssueStatus}= require('../controller/issueController');
// const { getUserProfile } = require('../controller/userController');


router.post('/report-issue',auth, upload.single('image'), createIssue);
router.get('/get-all-issues', getAllIssues);
router.put('/:id/status', updateIssueStatus);

module.exports = router;