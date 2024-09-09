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
            return res.status(400).json({ message: 'href or type not found' });
        }

        console.log(type);

        // Map the type to the corresponding key
        let key;
        switch (type) {
            case "Author":
                key = "authorData";
                break;
            case "Subject":
                key = "subjectData";
                break;
            case "Publisher":
                key = "publisherData";
                break;
            case "ItemType":
                key = "itemTypeData";
                break;
            default:
                return res.status(400).json({ message: 'Invalid type provided' });
        }

        const facetConfig = {
            method: 'get',
            url: href
        };

        const response = await axios.request(facetConfig);
        //   console.log(response.data);
        const facets = response.data;
        const data = {
            _embedded: facets._embedded,
            _links: facets._links,
            page: facets.page
        };

        // Respond with the dynamically chosen key
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
        // console.log(response.data)
        const metadata = response.data.metadata;
        const _links = response.data._links;
        let thumbnail = response.data._embedded?.thumbnail?._links?.content?.href;
        let file = response.data._embedded?.thumbnail?.name;
        let newFilename = null
        let externalLink;

        if (_links) {
            // console.log(_links)

            const _bundle = response.data._links.bundles.href;
            if (!_bundle) return;
            //     console.log("_bundle")
            //     console.log(_bundle)
            const config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: _bundle,
                params: {
                    embed: 'thumbnail'
                }
            };

            const bundleResult = await axios.request(config);
            //  console.log("response")
            //    console.log(bundleResult)
            //   console.log(bundleResult.data._embedded.bundles[0]._links.bitstreams.href)

            const bitstreams = bundleResult.data._embedded.bundles[0]._links.bitstreams.href;
            if (!bitstreams) return;
            const config1 = {
                method: 'get',
                maxBodyLength: Infinity,
                url: bitstreams,
                params: {
                    embed: 'thumbnail'
                }
            };

            const bitstreamsResult = await axios.request(config1);
            //   console.log("final repsponse")
            //  console.log(bitstreamsResult.data._embedded.bitstreams[0]._links.content.href)
            externalLink = bitstreamsResult.data._embedded.bitstreams[0]._links.content.href
        }
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
            externalLink,
            title: getFieldValue('dc.title'),
            author: getFieldValue('dc.contributor.author'),
            date: getFieldValue('dc.date.issued'),
            dtype: getFieldValue('dc.type'),
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
exports.getKohaData = async (req, res) => {
    try {
        const { term, logos } = req.body;

        if (!term) {
            return res.status(400).json({ message: 'Query term is required' });
        }

        const kohaUrl = `https://lucknowdigitallibraryopac.informaticsglobal.com/cgi-bin/koha/svc/search.pl?do=Search&q=${term}`;
        const kohaConfig = {
            method: 'get',
            maxBodyLength: Infinity,
            url: kohaUrl
        };

        const kohaResponse = await axios.request(kohaConfig);

        const resource = logos.find(resource => resource.label === "koha");
        let resourceLogo = null;
        if (resource) resourceLogo = resource.logo;

        const kohaExtractedData = kohaResponse.data.map(item => {
            return {
                id: item.id,
                title: item.title,
                database: "koha",
                resourceLogo,
                author: item.author,
                dtype: item.description,
                date: item.copyrightdate,
                subject: "",
                identifier: "",
                description: item.abstract,
                publisher: item.publishercode,
                imageUrl: null, // Add imageUrl if applicable
                links: {} // Add links if applicable
            };
        });

        res.status(200).json({
            data: kohaExtractedData,
            databaseCounts: [{ name: "Koha", count: kohaExtractedData.length }]
        });
    } catch (error) {
        console.error('Error processing Koha data:', error);
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};
exports.getData = async (req, res) => {
    try {
        const { term, page, author, database, logos, subject, publisher, itemtype } = req.body;

        if (!term) {
            return res.status(400).json({ message: 'Query term is required' });
        }
        const calls = [];
        let fAuthor = ''
        let fSubject = ''
        let fPublisher = ''
        let fItemtype = ''
        let fjSubject = ''
        if (author) {
            fAuthor = `&f.author=${author}`
        }
        if (subject) {
            fSubject = `&f.subject=${subject}`
        }
        if (publisher) {
            fPublisher = `&f.publisher=${publisher}`
        }
        if (itemtype) {
            fItemtype = `&f.itemtype=${itemtype}`
        }
        if (database.includes('dspace')) {
            const dspaceUrl = `https://idr.informaticsglobal.com/server/api/discover/search/objects?query=${term}&sort=score,DESC&embed=thumbnail&embed=item%2Fthumbnail&page=${page}&size=10${fAuthor}${fSubject}${fPublisher}${fItemtype}`;
            const dspaceConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: dspaceUrl
            };
            //  console.log("dspaceUrl" + dspaceUrl)
            calls.push(axios.request(dspaceConfig));
        }
        if (database.includes('koha')) {
            const kohaUrl = `https://lucknowdigitallibraryopac.informaticsglobal.com/cgi-bin/koha/svc/search.pl?do=Search&q=${term}`;
            const kohaConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: kohaUrl
            };
            //   console.log("kohaUrl" + kohaUrl)
            calls.push(axios.request(kohaConfig));
        }

        if (database.includes('j-gate')) {
            const jgateUrl = `https://demosearchapi.jgatenext.com/api/search?searchterm=${term}&rows=10&facets=all`;
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
        let itemTypeData = {};
        let publisherData = {};
        let pageDetails = {};
        let jgateSubjectData = {};
        let jgateAuthorData = {};
        const databaseCounts = [];

        if (database.includes('dspace')) {
            const dspaceResponse = responses.shift(); // Get the first response
            const resource = logos.find(resource => resource.label === "dspace");
            let resourceLogo = null
            if (resource) resourceLogo = resource.logo
            const dspaceExtractedData = dspaceResponse.data._embedded.searchResult._embedded.objects.map(obj => {
                const metadata = obj._embedded.indexableObject.metadata;
                const _links = obj._embedded.indexableObject._links;
                let thumbnail = obj._embedded?.indexableObject?._embedded?.thumbnail?._links?.content?.href;
                if (!thumbnail) thumbnail = null
                //   console.log(_links)
                const getFieldValue = (field) => {
                    return metadata[field] ? metadata[field].map(fieldObj => fieldObj.value).join('; ') : 'N/A';
                };

                return {
                    imageUrl: thumbnail,
                    links: _links,
                    database: "dspace",
                    resourceLogo,
                    id: obj._embedded.indexableObject.id,
                    title: getFieldValue('dc.title'),
                    dtype: getFieldValue('dc.type'),
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
            const dspacePublisherData = dspaceResponse.data._embedded.facets.find(obj => obj.name === "publisher");
            const dspaceItemTypeData = dspaceResponse.data._embedded.facets.find(obj => obj.name === "itemtype");
            const dspacePageDetails = dspaceResponse.data._embedded.searchResult.page;
            //     console.log(JSON.stringify(dspaceResponse.data))
            extractedData = [...extractedData, ...dspaceExtractedData];
            if (dspaceFilters) {
                appliedFilters = [...appliedFilters, ...dspaceFilters];
            }
            if (dspacePageDetails) {
                databaseCounts.push({ name: "DSpace", count: dspacePageDetails.totalElements })

            }
            // if (dspaceSubjectData) {
            //     subjectData = { ...subjectData, ...dspaceSubjectData }

            // }
            authorData = dspaceAuthorData
            subjectData = dspaceSubjectData
            itemTypeData = dspaceItemTypeData
            publisherData = dspacePublisherData
            // console.log("puliisher")
            //    console.log("puliisher" + JSON.stringify(publisherData))
            // console.log("item" + JSON.stringify(itemTypeData))
            pageDetails = dspacePageDetails
        }
        // console.log("subject")
        // console.log(JSON.stringify(subjectData))
        if (database.includes('koha')) {
            const kohaResponse = responses.shift(); // Get the second response
            // console.log(JSON.stringify(jgateResponse.data.data))

            const resource = logos.find(resource => resource.label === "koha");
            let resourceLogo = null
            if (resource) resourceLogo = resource.logo

            if (kohaResponse.data[0] !== "No results found") {
                const totalPages = true


                if (totalPages) {
                    databaseCounts.push({ name: "Koha", count: "" })
                }
                const kohaExtractedData = kohaResponse.data.map(item => {
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
                        database: "koha",
                        resourceLogo,
                        author: item.author,
                        dtype: item.description,
                        date: item.copyrightdate,
                        subject: "",
                        identifier: "",
                        description: item.abstract,
                        publisher: item.publishercode,

                    };
                });

                extractedData = [...extractedData, ...kohaExtractedData];
            }
            // Assuming jgateResponse contains similar structure for authorData and subjectData
            // Add logic to extract authorData and subjectData from jgateResponse if available
        }
        if (database.includes('j-gate')) {
            const jgateResponse = responses.shift(); // Get the second response
            // console.log(JSON.stringify(jgateResponse.data.data))
            const totalPages = jgateResponse.data.data.docs_total_pages
            const resource = logos.find(resource => resource.label === "j-gate");
            let resourceLogo = null
            if (resource) resourceLogo = resource.logo
            const subjects = jgateResponse.data.data.jsonfacets?.subjects_name_l3?.buckets
            const authors = jgateResponse.data.data.jsonfacets?.authors_tk?.buckets
            if (authors && Array.isArray(authors)) {
                let values = authors.map(item => ({
                    label: item.val,
                    count: item.count.toString(),
                    _links: {} // You can populate _links with relevant data if needed
                }));

                jgateAuthorData['name'] = 'subject';
                jgateAuthorData['type'] = "dspace";
                jgateAuthorData['page'] = null;
                jgateAuthorData['_links'] = null;
                jgateAuthorData['_embedded'] = {}; // Initialize _embedded as an object
                jgateAuthorData['_embedded']['values'] = values; // Assign values to _embedded['values']
            }
            if (subjects && Array.isArray(subjects)) {
                let values = subjects.map(item => ({
                    label: item.val,
                    count: item.count.toString(),
                    _links: {} // You can populate _links with relevant data if needed
                }));

                jgateSubjectData['name'] = 'subject';
                jgateSubjectData['type'] = "j-gate";
                jgateSubjectData['page'] = null;
                jgateSubjectData['_links'] = null;
                jgateSubjectData['_embedded'] = {}; // Initialize _embedded as an object
                jgateSubjectData['_embedded']['values'] = values; // Assign values to _embedded['values']
            }
            // console.log("subject")
            //  console.log(JSON.stringify(jgateSubjectData))
            // if (Object.values(jgateSubjectData).length > 0) {
            //     subjectData = { ...subjectData, ...jgateSubjectData }

            // }

            if (totalPages) {
                databaseCounts.push({ name: "J-Gate", count: totalPages * 10 })
            }
            let externalLink;


            const jgateExtractedData = jgateResponse.data.data.docs.map(item => {
                const metadata = item;
                const _links = {};
                let thumbnail = null;

                if (!thumbnail) thumbnail = null
                const getFieldValue = (field) => {
                    return metadata[field] ? metadata[field].map(fieldObj => fieldObj).join('; ') : 'N/A';
                };
                if (item.article_id) {
                    externalLink = `https://jgatenext.com/abstractFullScreen?id=${item.article_id}`

                }
                return {
                    externalLink,
                    imageUrl: thumbnail,
                    links: _links,
                    id: item.id,
                    resourceLogo,
                    title: item.title,
                    database: "j-gate",
                    author: getFieldValue('authors'),
                    dtype: item.data_type,
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
        // Check if both values arrays are not null
        const subjectValues = subjectData._embedded?.values || [];
        const jgateValues = jgateSubjectData._embedded?.values || [];

        // Merge the values arrays only if both are not null
        const mergedSubjectValues = [...subjectValues, ...jgateValues];

        // Create the merged object
        const mergedSubjectObject = {
            ...subjectData,
            _embedded: {
                ...subjectData._embedded,
                values: mergedSubjectValues
            }
        };


        // Check if both values arrays are not null or undefined
        const authorValues = authorData._embedded?.values || [];
        const jgateAuthorValues = jgateAuthorData._embedded?.values || [];

        // Merge the values arrays only if both are not null
        const mergedAuthorValues = [...authorValues, ...jgateAuthorValues];

        // Create the merged object
        const mergedAuthorObject = {
            ...authorData,
            _embedded: {
                ...authorData._embedded,
                values: mergedAuthorValues
            }
        };

        //   console.log(mergedAuthorObject);

        res.status(200).json({
            pageDetails,
            data: extractedData,
            authorData: mergedAuthorObject,
            subjectData: mergedSubjectObject,
            publisherData,
            itemTypeData,
            appliedFilters,
            databaseCounts
        });

    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};

exports.getBrowseData = async (req, res) => {
    try {
        const { startsWith, page, author, database, logos } = req.body;
        console.log(database)
        if (!startsWith) {
            return res.status(400).json({ message: 'Query term is required' });
        }
        const calls = [];


        if (database.includes('dspace')) {
            const dspaceUrl = `https://idr.informaticsglobal.com/server/api/discover/browses/title/items?sort=dc.title,ASC&startsWith=${startsWith}&page=${page}&size=10&embed=thumbnail`
            const dspaceConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: dspaceUrl
            };
            // console.log(dspaceUrl)
            calls.push(axios.request(dspaceConfig));
        }
        if (database.includes('koha')) {
            const kohaUrl = `https://lucknowdigitallibraryopac.informaticsglobal.com/cgi-bin/koha/svc/search.pl?do=Search&q=${startsWith}`;
            const kohaConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: kohaUrl
            };
            //  console.log("kohaUrl" + kohaUrl)
            calls.push(axios.request(kohaConfig));
        }
        if (database.includes('j-gate')) {
            const jgateUrl = `https://demosearchapi.jgatenext.com/api/browse_journal?journal_name=${startsWith}&page=1&rows=10&search_mode=startswith`;
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

        const responses = await Promise.all(calls);


        let extractedData = [];
        let pageDetails = {};

        // Extract specific data from the response
        // Extract specific data from the response with checks
        if (database.includes('dspace')) {
            const dspaceResponse = responses.shift(); // Get the first response
            let resourceLogo = null
            const resource = logos.find(resource => resource.label === "dspace");

            if (resource) resourceLogo = resource.logo
            const dspaceExtractedData = dspaceResponse.data._embedded.items.map(obj => {
                const metadata = obj.metadata;
                const _links = obj._links;
                let thumbnail = obj._embedded?.thumbnail?._links?.content?.href;
                console.log('dspace' + thumbnail)

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
                    resourceLogo,
                    database: "dspace",
                    title: getFieldValue('dc.title'),
                    author: getFieldValue('dc.contributor.author'),
                    date: getFieldValue('dc.date.issued'),
                    dtype: getFieldValue('dc.type'),

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
        if (database.includes('koha')) {
            const kohaResponse = responses.shift(); // Get the second response
            // console.log(JSON.stringify(jgateResponse.data.data))
            const totalPages = true
            const resource = logos.find(resource => resource.label === "koha");
            let resourceLogo = null
            if (resource) resourceLogo = resource.logo

            // if (totalPages) {
            //     databaseCounts.push({ name: "Koha", count: "" })
            // }

            const kohaExtractedData = kohaResponse.data.map(item => {
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
                    database: "koha",
                    author: item.author,
                    dtype: item.description,
                    date: item.copyrightdate,
                    subject: "",
                    identifier: "",
                    description: item.abstract,
                    publisher: item.publishercode,
                    resourceLogo,

                };
            });

            extractedData = [...extractedData, ...kohaExtractedData];
            // Assuming jgateResponse contains similar structure for authorData and subjectData
            // Add logic to extract authorData and subjectData from jgateResponse if available
        }
        if (database.includes('j-gate')) {
            const jgateResponse = responses.shift(); // Get the second response
            // console.log(JSON.stringify(jgateResponse.data.data))
            const totalPages = jgateResponse.data.data.docs_total_pages
            console.log('totalPages' + totalPages)
            // if (totalPages) {
            //     databaseCounts.push({ name: "J-Gate", count: totalPages * 10 })

            // }
            const resource = logos.find(resource => resource.label === "j-gate");
            let resourceLogo = null
            if (resource) resourceLogo = resource.logo
            const jgateExtractedData = jgateResponse.data.data.docs.map(item => {
                const metadata = item;
                const _links = {};
                let thumbnail = null;

                if (!thumbnail) thumbnail = null
                const getFieldValue = (field) => {
                    return metadata[field] ? metadata[field].map(fieldObj => fieldObj).join('; ') : 'N/A';
                };
                let externalLink;
                if (item.article_id) {
                    externalLink = `https://jgatenext.com/abstractFullScreen?id=${item.article_id}`

                }

                return {
                    externalLink,
                    imageUrl: thumbnail,
                    links: _links,
                    id: item.id,
                    title: item.resource_name,
                    database: "j-gate",
                    dtype: item.data_type,
                    author: getFieldValue('authors'),
                    date: item.yearfrom,
                    subject: getFieldValue('subjects_name_l1'),
                    identifier: null,
                    description: item.aboutresource,
                    resourceLogo,
                    publisher: getFieldValue('publisher_name'),
                    imageUrl: null
                };
            });

            extractedData = [...extractedData, ...jgateExtractedData];
            // Assuming jgateResponse contains similar structure for authorData and subjectData
            // Add logic to extract authorData and subjectData from jgateResponse if available
        }
        res.status(200).json({ pageDetails, data: extractedData, });

    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};
