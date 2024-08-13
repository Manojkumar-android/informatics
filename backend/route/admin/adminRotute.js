const express = require('express');
const router = express.Router();
const admin = require('../../controller/admin/adminController');
const jwt = require('../../middleware/authMiddleware');

router.post('/signup', admin.createAdmin);
router.post('/login', admin.login);

//University add 
router.post('/addUniversity', admin.addUniversity);


module.exports = router;