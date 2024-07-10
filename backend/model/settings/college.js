'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    name: {
        type: String,
        default: ''
    },

    deleteStatus: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('college', TaskSchema);
