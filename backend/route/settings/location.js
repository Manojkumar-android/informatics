const express = require('express');
const router = express.Router();
const location = require('../../controller/settings/location');



//Location Length
router.get('/locationCounts', location.locationCounts)


//Country
router.get('/country', location.getCountry)
router.post('/country', location.createCountry)
router.put('/country/:id', location.updateCountry)
router.put('/countryStatus/:id', location.countryStatus)


//State
router.get('/state', location.getStates)
router.post('/state', location.createState)

// City
router.get('/city', location.getCities)
router.post('/city', location.createCity)

// Pincode
router.get('/pincode', location.getPostalCodes)
router.post('/pincode', location.createPincode)
module.exports = router;