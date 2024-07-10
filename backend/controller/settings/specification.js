'use strict';
const e = require('express');
var mongoose = require('mongoose'),
    Specification = mongoose.model('specification');


exports.createSpecification = async function (req, res) {
    try {
        // Extract the name from the request body

        const { name } = req.body;

        // Check if a Specification with the same name already exists
        const existingSpecification = await Specification.findOne({ name });
        if (existingSpecification) {
            return res.status(400).json({ message: 'Specification with the same name already exists' });
        }

        // Create a new country document
        const newSpecification = new Specification({ name });
        await newSpecification.save();

        res.status(201).json({ message: 'Specification added successfully', newSpecification });
    } catch (error) {
        console.error('Error adding Specification:', error);
        res.status(500).json({ message: 'Failed to add Specification', error: error.message });
    }
}

exports.getSpecification = async function (req, res) {
    try {
        const specifications = await Specification.find({});
        const specificationsWithSno = specifications.map((item, index) => ({
            ...item.toObject(),
            sno: index + 1
        }));

        res.status(200).json(specificationsWithSno);
    } catch (error) {
        console.error('Error fetching specifications:', error);
        res.status(500).json({ message: 'Failed to fetch specifications', error: error.message });
    }
}

exports.specificationStatus = async function (req, res) {
    try {
        const { id } = req.params; // Extract specification ID from request params
        const { status } = req.body; // Extract deleteStatus from request body

        // Find the specification by ID and update its deleteStatus
        const updatedSpecification = await Specification.findByIdAndUpdate(id, { deleteStatus: status }, { new: true });

        if (!updatedSpecification) {
            return res.status(404).json({ message: 'Specification not found' });
        }

        res.status(200).json({ message: 'Delete status updated successfully', updatedSpecification });
    } catch (error) {
        console.error('Error updating delete status:', error);
        res.status(500).json({ message: 'Failed to update delete status', error: error.message });
    }

}
exports.updateSpecification = async function (req, res) {
    try {
        // Extrac   t the ID and new name from the request body
        const { name } = req.body;
        const { id } = req.params;

        // Find the Specification by ID
        const existingSpecification = await Specification.findById(id);
        if (!existingSpecification) {
            return res.status(404).json({ message: 'Specification not found' });
        }

        // Check if the new name is the same as the existing name
        if (name === existingSpecification.name) {
            return res.status(400).json({ message: 'New name is the same as the existing name' });
        }



        // Update the Specification name
        existingSpecification.name = name;
        await existingSpecification.save();

        res.status(200).json({ message: 'Specification updated successfully', updatedSpecification: existingSpecification });
    } catch (error) {
        console.error('Error updating Specification:', error);
        res.status(500).json({ message: 'Failed to update Specification', error: error.message });
    }
}