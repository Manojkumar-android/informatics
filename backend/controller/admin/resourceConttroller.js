const Resource = require('../../model/admin/resourceModel'); // Adjust the path as necessary
const University = require('../../model/admin/universityModel');

exports.createResource = async (req, res) => {
    try {
        const {
            name,
            searchApiLink,
            publisherWebsite,
            browseApiLink,
            description,
            resourcesTypes,
            status,
            searchHeaderValue,
            searchHeaderParam
        } = req.body;

        let searchHeader = null;
        let logo = "";


        if (searchHeaderParam && searchHeaderValue) {
            searchHeader = {
                paramName: searchHeaderParam,
                keyValue: searchHeaderValue
            };
        }

        if (req.file) {
            logo = process.env.IMAGE_URL + "resource/" + req.file.filename;
        }

        // Create a new resource instance with nested schemas
        const newResource = new Resource({
            name,
            logo,
            searchApiLink,
            browseApiLink,
            publisherWebsite,
            description,
            resourcesTypes: JSON.parse(resourcesTypes),
            searchHeader,
            status,
            searchHeader
        });

        // Save the resource to the database
        const savedResource = await newResource.save();

        // Respond with the created resource
        res.status(201).json(savedResource);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getResources = async (req, res) => {
    try {
        // Fetch all resources from the database
        const resources = await Resource.find();

        // Respond with the fetched resources
        res.status(200).json(resources);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUniversityNames = async (req, res) => {
    try {
        // Find universities where resources array is not empty
        const universities = await University.find();



        res.status(200).json(universities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAssignedUniversity = async (req, res) => {
    try {
        // Find universities where resources array is not empty
        const universities = await University.find({ 'resources.0': { $exists: true } });

        // Map through universities to add the resourceTypesString parameter
        const result = await Promise.all(universities.map(async (university) => {
            // Fetch resource details
            const resourceDetails = await Promise.all(university.resources.map(async (resourceId) => {
                const resource = await Resource.findById(resourceId);
                return resource ? resource.name : null; // Handle if resource is not found
            }));

            // Concatenate resource names into a string
            const resourceTypesString = resourceDetails.filter(name => name).join(', ');

            return {
                ...university.toObject(),
                resourceTypesString
            };
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAssignedDetails = async (req, res) => {
    try {
        const {
            universityId
        } = req.query;
        // Find universities where resources array is not empty
        const universitie = await University.findById(universityId);
        console.log(universityId)
        console.log(universitie)
        const resources = universitie.resources

        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateResources = async (req, res) => {
    try {
        const { universityId } = req.query;
        const { resources } = req.body;
        console.log(resources)
        // Find the university by universityId and update the resources array
        const updatedUniversity = await University.findByIdAndUpdate(
            universityId,
            { $set: { resources: resources } },
            { new: true } // Return the updated document
        );

        if (!updatedUniversity) {
            return res.status(404).json({ error: 'University not found' });
        }

        // Respond with the updated university document
        res.status(200).json(updatedUniversity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};