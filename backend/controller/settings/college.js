'use strict';
const e = require('express');
var mongoose = require('mongoose'),
    College = mongoose.model('college');


exports.createCollege = async function (req, res) {
    try {
        // Extract the name from the request body

        const { name } = req.body;

        // Check if a College with the same name already exists
        const existingCollege = await College.findOne({ name });
        if (existingCollege) {
            return res.status(400).json({ message: 'College with the same name already exists' });
        }

        // Create a new country document
        const newCollege = new College({ name });
        await newCollege.save();

        res.status(201).json({ message: 'College added successfully', newCollege });
    } catch (error) {
        console.error('Error adding College:', error);
        res.status(500).json({ message: 'Failed to add College', error: error.message });
    }
}

exports.getCollege = async function (req, res) {
    try {
        const colleges = await College.find({});
        const collegesWithSno = colleges.map((item, index) => ({
            ...item.toObject(),
            sno: index + 1
        }));

        res.status(200).json(collegesWithSno);
    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Failed to fetch colleges', error: error.message });
    }
}


exports.collegeStatus = async function (req, res) {
    try {
        const { id } = req.params; // Extract College ID from request params
        const { status } = req.body; // Extract deleteStatus from request body

        // Find the College by ID and update its deleteStatus
        const updatedCollege = await College.findByIdAndUpdate(id, { deleteStatus: status }, { new: true });

        if (!updatedCollege) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.status(200).json({ message: 'Delete status updated successfully', updatedCollege });
    } catch (error) {
        console.error('Error updating delete status:', error);
        res.status(500).json({ message: 'Failed to update delete status', error: error.message });
    }

}
exports.updateCollege = async function (req, res) {
    try {
        // Extrac   t the ID and new name from the request body
        const { name } = req.body;
        const { id } = req.params;

        // Find the College by ID
        const existingCollege = await College.findById(id);
        if (!existingCollege) {
            return res.status(404).json({ message: 'College not found' });
        }

        // Check if the new name is the same as the existing name
        if (name === existingCollege.name) {
            return res.status(400).json({ message: 'New name is the same as the existing name' });
        }



        // Update the Specification name
        existingCollege.name = name;
        await existingCollege.save();

        res.status(200).json({ message: 'College updated successfully', updatedCollege: existingCollege });
    } catch (error) {
        console.error('Error updating College:', error);
        res.status(500).json({ message: 'Failed to update College', error: error.message });
    }
}