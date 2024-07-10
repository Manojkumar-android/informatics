'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    country: {
        type: Schema.Types.ObjectId, // Reference to the country document
        ref: 'country' // Reference to the country model
    },
    state: {
        type: Schema.Types.ObjectId, // Reference to the state document
        ref: 'state' // Reference to the state model
    },
    deleteStatus: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('city', TaskSchema);
