const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    resources: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'resource' }], default: [] },


    universityId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: ""
    },
    logo: {
        type: String,
        default: ""
    },

}, { timestamps: true });

module.exports = mongoose.model('university', instituteSchema);
