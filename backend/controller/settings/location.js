'use strict';
const e = require('express');
var mongoose = require('mongoose'),
    Country = mongoose.model('country'),
    State = mongoose.model('state'),
    City = mongoose.model('city'),
    Pincode = mongoose.model('pincode');
exports.createCountry = async function (req, res) {
    try {
        // Extract the name from the request body

        console.log(req.body)
        const { name } = req.body;

        // Check if a country with the same name already exists
        const existingCountry = await Country.findOne({ name });
        if (existingCountry) {
            return res.status(400).json({ message: 'Country with the same name already exists' });
        }

        // Create a new country document
        const newCountry = new Country({ name });
        await newCountry.save();

        res.status(201).json({ message: 'Country added successfully', newCountry });
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).json({ message: 'Failed to add country', error: error.message });
    }
}
exports.locationCounts = async function (req, res) {
    try {
        const count = await Country.countDocuments({ deleteStatus: false });
        const state = await State.countDocuments({ deleteStatus: false });
        const city = await City.countDocuments({ deleteStatus: false });
        const pincode = await Pincode.countDocuments({ deleteStatus: false });
        res.status(200).json({ country: count, state, city, pincode });

    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ message: 'Failed to fetch country', error: error.message });
    }
}

exports.getCountry = async function (req, res) {
    try {
        const countries = await Country.find({});
        const countriesWithSno = countries.map((country, index) => ({
            ...country.toObject(),
            sno: index + 1
        }));

        res.status(200).json(countriesWithSno);
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).json({ message: 'Failed to fetch country', error: error.message });
    }
}
exports.countryStatus = async function (req, res) {
    try {
        const { id } = req.params; // Extract country ID from request params
        const { status } = req.body; // Extract deleteStatus from request body

        // Find the country by ID and update its deleteStatus
        const updatedCountry = await Country.findByIdAndUpdate(id, { deleteStatus: status }, { new: true });

        if (!updatedCountry) {
            return res.status(404).json({ message: 'Country not found' });
        }

        res.status(200).json({ message: 'Delete status updated successfully', updatedCountry });
    } catch (error) {
        console.error('Error updating delete status:', error);
        res.status(500).json({ message: 'Failed to update delete status', error: error.message });
    }

}
exports.updateCountry = async function (req, res) {
    try {
        // Extrac   t the ID and new name from the request body
        const { name } = req.body;
        const { id } = req.params;

        // Find the country by ID
        const existingCountry = await Country.findById(id);
        if (!existingCountry) {
            return res.status(404).json({ message: 'Country not found' });
        }

        // Check if the new name is the same as the existing name
        if (name === existingCountry.name) {
            return res.status(400).json({ message: 'New name is the same as the existing name' });
        }



        // Update the country name
        existingCountry.name = name;
        await existingCountry.save();

        res.status(200).json({ message: 'Country updated successfully', updatedCountry: existingCountry });
    } catch (error) {
        console.error('Error updating country:', error);
        res.status(500).json({ message: 'Failed to update country', error: error.message });
    }
}

exports.getStates = async function (req, res) {
    try {
        const states = await State.find().populate('country', 'name');

        const statessWithSno = states.map((state, index) => ({
            ...state.toObject(),
            sno: index + 1
        }));

        const countries = await Country.find({ deleteStatus: false });
        // Transform the response to the desired format
        const transformedCountries = countries.map(country => ({
            label: country.name,
            value: country._id
        }));
        res.status(200).json({ states: statessWithSno, countries: transformedCountries });
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ message: 'Failed to fetch states', error: error.message });
    }
}
exports.createState = async function (req, res) {
    try {
        // Extract the name and country ID from the request body
        const { name, country } = req.body;
        if (!country) {
            return res.status(400).json({ message: 'Country is Required!' });

        }
        // Check if a state with the same name already exists
        const existingState = await State.findOne({ name });
        if (existingState) {
            return res.status(400).json({ message: 'State with the same name already exists' });
        }

        // Create a new state document
        const newState = new State({ name, country });
        await newState.save();

        res.status(201).json({ message: 'State added successfully', newState });
    } catch (error) {
        console.error('Error adding state:', error);
        res.status(500).json({ message: 'Failed to add state', error: error.message });
    }
}

exports.getCities = async function (req, res) {
    try {
        const cities = await City.find().populate('country', 'name').populate('state', 'name');

        const citiesWithSno = cities.map((city, index) => ({
            ...city.toObject(),
            sno: index + 1
        }));

        const countries = await Country.find({ deleteStatus: false });
        const transformedCountries = countries.map(country => ({
            label: country.name,
            value: country._id
        }));

        const states = await State.find({ deleteStatus: false });
        const transformedStates = states.map(state => ({
            label: state.name,
            value: state._id
        }));

        res.status(200).json({ cities: citiesWithSno, countries: transformedCountries, states: transformedStates });
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ message: 'Failed to fetch cities', error: error.message });
    }
}

exports.createCity = async function (req, res) {
    try {
        const { name, country, state } = req.body;
        if (!country || !state) {
            return res.status(400).json({ message: 'Country and State are Required!' });
        }

        const existingCity = await City.findOne({ name });
        if (existingCity) {
            return res.status(400).json({ message: 'City with the same name already exists' });
        }

        const newCity = new City({ name, country, state });
        await newCity.save();

        res.status(201).json({ message: 'City added successfully', newCity });
    } catch (error) {
        console.error('Error adding city:', error);
        res.status(500).json({ message: 'Failed to add city', error: error.message });
    }
}

exports.getPostalCodes = async function (req, res) {
    try {
        const pincodes = await Pincode.find().populate('country', 'name').populate('state', 'name').populate('city', 'name');

        const pincodesWithSno = pincodes.map((pincode, index) => ({
            ...pincode.toObject(),
            sno: index + 1
        }));

        const countries = await Country.find({ deleteStatus: false });
        const transformedCountries = countries.map(country => ({
            label: country.name,
            value: country._id
        }));

        const states = await State.find({ deleteStatus: false });
        const transformedStates = states.map(state => ({
            label: state.name,
            value: state._id
        }));

        const cities = await City.find({ deleteStatus: false });
        const transformedCities = cities.map(city => ({
            label: city.name,
            value: city._id
        }));

        res.status(200).json({ pincodes: pincodesWithSno, countries: transformedCountries, states: transformedStates, cities: transformedCities });
    } catch (error) {
        console.error('Error fetching pincodes:', error);
        res.status(500).json({ message: 'Failed to fetch pincodes', error: error.message });
    }
}

exports.createPincode = async function (req, res) {
    try {
        const { code, country, state, city } = req.body;
        if (!country || !state || !city) {
            return res.status(400).json({ message: 'Country, State, and City are Required!' });
        }

        const existingPincode = await Pincode.findOne({ code });
        if (existingPincode) {
            return res.status(400).json({ message: 'Pincode with the same code already exists' });
        }

        const newPincode = new Pincode({ code, country, state, city });
        await newPincode.save();

        res.status(201).json({ message: 'Pincode added successfully', newPincode });
    } catch (error) {
        console.error('Error adding pincode:', error);
        res.status(500).json({ message: 'Failed to add pincode', error: error.message });
    }
}