const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rootURL: {
        type: String,
        required: true
    },

    universityName: {
        type: String,
        required: true
    },

    disclaimer: {
        type: String,
        default: null
    },
    about: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Institute', instituteSchema);
