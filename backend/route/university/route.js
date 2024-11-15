const express = require('express');
const router = express.Router();
const controller = require('../../controller/univerisity/controller');

router.get('/getAssignedResource', controller.getAssignedResource);


router.post('/getKohaData', controller.getKohaData);
router.post('/getSearchData', controller.getData);
router.post('/getSearchDetails', controller.getSearchDetails);
router.post('/getFacetsData', controller.getFacetsData);
router.post('/getFacetsSearch', controller.getFacetsSearch);
router.post('/getBrowseData', controller.getBrowseData);

router.get('/getResouceCategory', controller.getResouceCategory);


module.exports = router;