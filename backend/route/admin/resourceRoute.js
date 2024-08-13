const express = require('express');
const router = express.Router();
const { createResource, getResources, getAssignedUniversity, getUniversityNames, getAssignedDetails, updateResources } = require('../../controller/admin/resourceConttroller');
const uploadImage = require('../../middleware/uploadResource');

router.post('/createResource', uploadImage.single('logo'), createResource);
router.get('/resource', getResources);
router.get('/getAssignedUniversity', getAssignedUniversity);
router.get('/getUniversityNames', getUniversityNames);
router.get('/getAssignedDetails', getAssignedDetails);

router.put('/updateResources', updateResources);

//mobile app
module.exports = router;