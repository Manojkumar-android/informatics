// controllers/adminController.js
const Admin = require('../../model/admin/adminModel'); // Adjust the path as necessary
const University = require('../../model/admin/universityModel');
const { createSecretToken } = require("../../jwt");
var axios = require('axios');



exports.getAssignedResource = async (req, res) => {
    try {

        const { universityId } = req.query
        if (!universityId) {
            return res.status(400).json({ message: 'libraryId not found' });
        }
        // Fetch all University from the database
        const university = await University.findOne({ universityId: universityId }).populate('resources');
        if (!university) {
            return res.status(400).json({ message: 'university not found' });
        }
        console.log(JSON.stringify(university.resources))
        // Respond with the fetched resources
        res.status(200).json({ resources: university.resources });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getFacetsData = async (req, res) => {
    try {
        const { href, type } = req.body;

        if (!href || !type) {
            return res.status(400).json({ message: 'href not found' });
        }
        console.log(req.body)
        let key = type === "Author" ? "authorData" : "subjectData"
        const facetConfig = {
            method: 'get',
            url: href
        };
        const response = await axios.request(facetConfig);
        console.log(response.data)
        const facets = response.data;
        const data = { _embedded: response.data._embedded, _links: response.data._links, page: response.data.page }
        res.status(200).json({ [key]: data });
    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};
exports.getSearchDetails = async (req, res) => {
    try {
        const { href } = req.body;

        if (!href) {
            return res.status(400).json({ message: 'Query href is required' });
        }

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: href,
            params: {
                embed: 'thumbnail'
            }
        };

        const response = await axios.request(config);
        console.log(response.data)
        const metadata = response.data.metadata;
        const _links = response.data._links;
        let thumbnail = response.data._embedded?.thumbnail?._links?.content?.href;
        let file = response.data._embedded?.thumbnail?.name;
        let newFilename = null
        if (file) {
            // Split the filename by periods (.)
            let parts = file.split('.');

            // Remove the last element (which is the last extension)
            parts.pop();

            // Join the remaining parts back together with a period (.) to form the new filename
            newFilename = parts.join('.');

        }

        const sizeBytes = response.data._embedded?.thumbnail?.sizeBytes;
        // Convert bytes to megabytes (MB)
        const sizeMB = sizeBytes / 1024;
        let size = null
        if (sizeMB) {
            size = `${sizeMB.toFixed(2)} MB`
        }
        console.log(`Size in MB: ${sizeMB.toFixed(2)} MB`);
        if (!thumbnail) thumbnail = null
        //     console.log(_links)
        const getFieldValue = (field) => {
            return metadata[field] ? metadata[field].map(fieldObj => fieldObj.value).join('; ') : 'N/A';
        };

        const obj = {
            imageUrl: thumbnail,
            links: _links,
            id: response.data.id,
            file: newFilename,
            size: size,
            title: getFieldValue('dc.title'),
            author: getFieldValue('dc.contributor.author'),
            date: getFieldValue('dc.date.issued'),
            subject: getFieldValue('dc.subject'),           // Example for subjects
            identifier: getFieldValue('dc.identifier'),     // Example for identifiers
            description: getFieldValue('dc.description.abstract'),  // Example for descriptions
            publisher: getFieldValue('dc.publisher')    // Example for descriptions
        };

        res.status(200).json({ details: obj, status: true });

    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};
exports.getData = async (req, res) => {
    try {
        const { term, page, author, database, subject } = req.body;

        if (!term) {
            return res.status(400).json({ message: 'Query term is required' });
        }
        console.log(database)
        const calls = [];
        let fAuthor = ''
        let fSubject = ''
        if (author) {
            fAuthor = `&f.author=${author}`
        }
        if (subject) {
            fSubject = `&f.subject=${subject}`
        }
        if (database.includes('dspace')) {
            const dspaceUrl = `https://idr.informaticsglobal.com/server/api/discover/search/objects?query=${term}${fSubject}&sort=score,DESC&embed=thumbnail&embed=item%2Fthumbnail&page=${page}&size=20${fAuthor}`;
            const dspaceConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: dspaceUrl
            };
            console.log(dspaceUrl)
            calls.push(axios.request(dspaceConfig));
        }

        if (database.includes('j-gate')) {
            const jgateUrl = `https://demosearchapi.jgatenext.com/api/search?searchterm=${term}`;
            const jgateConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: jgateUrl,
                headers: {
                    'Api-Key': 'e54d44315dab474eb71a0db1fcb9e659' // Add any required headers here
                },

            };
            calls.push(axios.request(jgateConfig));
        }

        // Make API calls in parallel using Promise.all
        const responses = await Promise.all(calls);

        let extractedData = [];
        let appliedFilters = [];
        let authorData = {};
        let subjectData = {};
        let pageDetails = {};
        const databaseCounts = [];

        if (database.includes('dspace')) {
            const dspaceResponse = responses.shift(); // Get the first response
            const dspaceExtractedData = dspaceResponse.data._embedded.searchResult._embedded.objects.map(obj => {
                const metadata = obj._embedded.indexableObject.metadata;
                const _links = obj._embedded.indexableObject._links;
                let thumbnail = obj._embedded?.indexableObject?._embedded?.thumbnail?._links?.content?.href;
                databaseCounts.push({ name: "dspace", count: 9999 })
                if (!thumbnail) thumbnail = null
                //   console.log(_links)
                const getFieldValue = (field) => {
                    return metadata[field] ? metadata[field].map(fieldObj => fieldObj.value).join('; ') : 'N/A';
                };

                return {
                    imageUrl: thumbnail,
                    links: _links,
                    database: "dspace",
                    id: obj._embedded.indexableObject.id,
                    title: getFieldValue('dc.title'),
                    author: getFieldValue('dc.contributor.author'),
                    date: getFieldValue('dc.date.issued'),
                    subject: getFieldValue('dc.subject'),           // Example for subjects
                    identifier: getFieldValue('dc.identifier'),     // Example for identifiers
                    description: getFieldValue('dc.description.abstract'),  // Example for descriptions
                    publisher: getFieldValue('dc.publisher')    // Example for descriptions
                };
            });

            const dspaceFilters = dspaceResponse.data.appliedFilters
            const dspaceAuthorData = dspaceResponse.data._embedded.facets.find(obj => obj.name === "author");
            const dspaceSubjectData = dspaceResponse.data._embedded.facets.find(obj => obj.name === "subject");
            const dspacePageDetails = dspaceResponse.data._embedded.searchResult.page;
            //     console.log(JSON.stringify(dspaceResponse.data))
            extractedData = [...extractedData, ...dspaceExtractedData];
            if (dspaceFilters) {
                appliedFilters = [...appliedFilters, ...dspaceFilters];
            }


            authorData = dspaceAuthorData
            subjectData = dspaceSubjectData
            pageDetails = dspacePageDetails
        }

        if (database.includes('j-gate')) {
            const jgateResponse = responses.shift(); // Get the second response
            console.log(JSON.stringify(jgateResponse.data.data))
            databaseCounts.push({ name: "j-gate", count: 9999 })

            const jgateExtractedData = jgateResponse.data.data.docs.map(item => {
                const metadata = item;
                const _links = {};
                let thumbnail = null;

                if (!thumbnail) thumbnail = null
                const getFieldValue = (field) => {
                    return metadata[field] ? metadata[field].map(fieldObj => fieldObj).join('; ') : 'N/A';
                };

                return {
                    imageUrl: thumbnail,
                    links: _links,
                    id: item.id,
                    title: item.title,
                    database: "j-gate",
                    author: getFieldValue('authors'),
                    date: item.yearfrom,
                    subject: item.subject,
                    identifier: item.identifier,
                    description: item.abstract,
                    publisher: getFieldValue('publisher_name'),
                    imageUrl: item.imageUrl
                };
            });

            extractedData = [...extractedData, ...jgateExtractedData];
            // Assuming jgateResponse contains similar structure for authorData and subjectData
            // Add logic to extract authorData and subjectData from jgateResponse if available
        }
        // console.log(extractedData)
        // console.log(pageDetails)
        res.status(200).json({ pageDetails, data: extractedData, authorData, subjectData, appliedFilters, databaseCounts });

    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};

exports.getBrowseData = async (req, res) => {
    try {
        const { startsWith, page, author, database } = req.body;
        console.log(database)
        if (!startsWith) {
            return res.status(400).json({ message: 'Query term is required' });
        }
        const calls = [];


        if (database.includes('dspace')) {
            const dspaceUrl = `https://idr.informaticsglobal.com/server/api/discover/browses/title/items?sort=dc.title,ASC&startsWith=${startsWith}&page=${page}&size=20&embed=thumbnail`
            const dspaceConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: dspaceUrl
            };
            console.log(dspaceUrl)
            calls.push(axios.request(dspaceConfig));
        }
        if (database.includes('j-gate')) {
            // const jgateUrl = `https://demosearchapi.jgatenext.com/api/search?searchterm=${term}`;
            // const jgateConfig = {
            //     method: 'get',
            //     maxBodyLength: Infinity,
            //     url: jgateUrl,
            //     headers: {
            //         'Api-Key': 'e54d44315dab474eb71a0db1fcb9e659' // Add any required headers here
            //     },

            // };
            // calls.push(axios.request(jgateConfig));
        }

        const responses = await Promise.all(calls);


        let extractedData = [];

        // Extract specific data from the response
        // Extract specific data from the response with checks
        if (database.includes('dspace')) {
            const dspaceResponse = responses.shift(); // Get the first response

            const dspaceExtractedData = dspaceResponse.data._embedded.items.map(obj => {
                const metadata = obj.metadata;
                const _links = obj._links;
                let thumbnail = obj._embedded?.thumbnail?._links?.content?.href;

                if (!thumbnail) thumbnail = null
                //   console.log(_links)
                const getFieldValue = (field) => {
                    return metadata[field] ? metadata[field].map(fieldObj => fieldObj.value).join('; ') : 'N/A';
                };

                return {
                    imageUrl: thumbnail,
                    links: _links,
                    database: "dspace",
                    id: obj.id,
                    database: "dspace",
                    title: getFieldValue('dc.title'),
                    author: getFieldValue('dc.contributor.author'),
                    date: getFieldValue('dc.date.issued'),
                    subject: getFieldValue('dc.subject'),           // Example for subjects
                    identifier: getFieldValue('dc.identifier'),     // Example for identifiers
                    description: getFieldValue('dc.description.abstract'),  // Example for descriptions
                    publisher: getFieldValue('dc.publisher')    // Example for descriptions
                };
            });

            const dspaceFilters = dspaceResponse.data.appliedFilters
            // const dspaceAuthorData = dspaceResponse.data._embedded.facets.find(obj => obj.name === "author");
            // const dspaceSubjectData = dspaceResponse.data._embedded.facets.find(obj => obj.name === "subject");
            const dspacePageDetails = dspaceResponse.data.page;
            //     console.log(JSON.stringify(dspaceResponse.data))
            extractedData = [...extractedData, ...dspaceExtractedData];




            pageDetails = dspacePageDetails
        }


        res.status(200).json({ pageDetails, data: extractedData, });

    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};
