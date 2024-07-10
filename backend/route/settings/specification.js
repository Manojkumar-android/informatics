const express = require('express');
const router = express.Router();
const specification = require('../../controller/settings/specification');

router.get('/', specification.getSpecification)
router.post('/add', specification.createSpecification)
router.put('/update/:id', specification.updateSpecification)
router.put('/updateStatus/:id', specification.specificationStatus)
module.exports = router;