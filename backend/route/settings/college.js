const express = require('express');
const router = express.Router();
const college = require('../../controller/settings/college');

router.get('/', college.getCollege)
router.post('/add', college.createCollege)
router.put('/update/:id', college.updateCollege)
router.put('/updateStatus/:id', college.collegeStatus)
module.exports = router;