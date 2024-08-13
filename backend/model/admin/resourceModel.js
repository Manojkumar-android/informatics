const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
    paramName: { type: String, required: true },
    keyValue: { type: String, required: true }
}, { _id: false });

const resourceTypeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    resourceTypeId: { type: String, required: true },
    displayName: { type: String, required: true }
}, { _id: false });

const resourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, default: '' },
    searchApiLink: { type: String, required: true },
    browseApiLink: { type: String, required: true },
    publisherWebsite: { type: String, default: '' },
    description: { type: String, default: '' },
    resourcesTypes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ResourceType' }], default: [] },
    status: { type: Number, default: 1 },
    searchHeader: { type: headerSchema, default: null }
}, { timestamps: true });

module.exports = mongoose.model('resource', resourceSchema);
