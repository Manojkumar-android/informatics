const express = require('express');
const router = express.Router();
const { createResource, updateResource, getResourcesById, getResources, getAssignedUniversity, getUniversityNames, getAssignedDetails, updateResources } = require('../../controller/admin/resourceConttroller');
const uploadImage = require('../../middleware/uploadResource');

router.post('/createResource', uploadImage.single('logo'), createResource);
router.post('/updateResource', uploadImage.single('logo'), updateResource);
router.get('/resource', getResources);
router.get('/getResourcesById', getResourcesById);
router.get('/getAssignedUniversity', getAssignedUniversity);
router.get('/getUniversityNames', getUniversityNames);
router.get('/getAssignedDetails', getAssignedDetails);

router.put('/updateResources', updateResources);

//mobile app
module.exports = router;