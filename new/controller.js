// controllers/adminController.js
const Admin = require('../../model/admin/adminModel'); // Adjust the path as necessary
const University = require('../../model/admin/universityModel');
const { createSecretToken } = require("../../jwt");
var axios = require('axios');
const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false // Disable SSL verification
});


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
exports.getFacetsSearch = async (req, res) => {
    try {
        const { prefix, term, type, filter } = req.body;

        if (!prefix || !term || !type) {
            return res.status(400).json({ message: 'prefix or term or type not found' });
        }
        // Map the type to the corresponding key
        let key;
        let url;
        const { fAuthor, fSubject, fPublisher, fItemtype } = getFilteredResults(filter)
        //   console.log(JSON.stringify(getFilteredResults(filter)))
        switch (type) {
            case "Author":
                key = "authorData";

                url = `https://idr.informaticsglobal.com/server/api/discover/facets/author?prefix=${prefix}&page=0&size=5&query=${term}${fAuthor}${fSubject}${fPublisher}${fItemtype}`
                console.log(url)
                break;
            case "Subject":
                key = "subjectData";
                url = `https://idr.informaticsglobal.com/server/api/discover/facets/subject?prefix=${prefix}&page=0&size=5&query=${term}${fAuthor}${fSubject}${fPublisher}${fItemtype}`

                break;
            case "Publisher":
                key = "publisherData";
                url = `https://idr.informaticsglobal.com/server/api/discover/facets/publisher?prefix=${prefix}&page=0&size=5&query=${term}${fAuthor}${fSubject}${fPublisher}${fItemtype}`

                break;
            case "Item Type":
                key = "itemTypeData";
                url = `https://idr.informaticsglobal.com/server/api/discover/facets/itemtype?prefix=${prefix}&page=0&size=5&query=${term}${fAuthor}${fSubject}${fPublisher}${fItemtype}`

                break;
            default:
                return res.status(400).json({ message: 'Invalid type provided' });
        }

        const facetConfig = {
            method: 'get',
            url: url
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
            case "Item Type":
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
const getFilteredResults = (filter) => {
    let fAuthor = "";
    let fSubject = "";
    let fPublisher = "";
    let fItemtype = "";

    // Log filter for debugging

    // Process each filter object to build query string
    if (filter && filter.length > 0) {
        filter.map(obj => {
            if (obj.type === "author") {
                fAuthor = `&f.author=${obj.value}`;
            } else if (obj.type === "subject") {
                fSubject = `&f.subject=${obj.value}`;
            } else if (obj.type === "publisher") {
                fPublisher = `&f.publisher=${obj.value}`;
            } else if (obj.type === "itemtype") {
                fItemtype = `&f.itemtype=${obj.value}`;
            }
        });
    }

    return { fAuthor, fSubject, fPublisher, fItemtype }
}
exports.getData = async (req, res) => {
    try {
        const { term, page, filter, dbLinks, logos } = req.body;

        if (!term) {
            return res.status(400).json({ message: 'Query term is required' });
        }
        console.log(req.body)
        const calls = [];
        let fAuthor = ''
        let fSubject = ''
        let fPublisher = ''
        let fItemtype = ''
        const labels = dbLinks.map(item => item.label);
        if (filter) {
            filter.map(obj => {
                if (obj.type === "author") {
                    if (fAuthor !== '') {
                        fAuthor = `${fAuthor}&f.author=${obj.value}`;
                    } else {
                        fAuthor = `&f.author=${obj.value}`;
                    }
                } else if (obj.type === "subject") {
                    if (fSubject !== '') {
                        fSubject = `${fSubject}&f.subject=${obj.value}`;
                    } else {
                        fSubject = `&f.subject=${obj.value}`;
                    }
                } else if (obj.type === "publisher") {
                    if (fPublisher !== '') {
                        fPublisher = `${fPublisher}&f.publisher=${obj.value}`;
                    } else {
                        fPublisher = `&f.publisher=${obj.value}`;
                    }
                } else if (obj.type === "itemtype") {
                    if (fItemtype !== '') {
                        fItemtype = `${fItemtype}&f.itemtype=${obj.value}`;
                    } else {
                        fItemtype = `&f.itemtype=${obj.value}`;
                    }
                }
            });

        }



        if (labels.includes('DSpace')) {
            const dspaceLinks = dbLinks.filter(item => item.label === "DSpace");

            dspaceLinks.forEach(result => {
                const value = result ? result.value : null;
                const dspaceUrl = `${value}${term}&sort=score,DESC&embed=thumbnail&embed=item%2Fthumbnail&page=${page}&size=10${fAuthor}${fSubject}${fPublisher}${fItemtype}`;
                const dspaceConfig = {
                    method: 'get',
                    maxBodyLength: Infinity,
                    url: dspaceUrl
                };
                calls.push({ label: 'DSpace', request: axios.request(dspaceConfig) });
            });
        }
        if (labels.includes('Koha')) {
            const result = dbLinks.find(item => item.label === "Koha");
            const value = result ? result.value : null;
            //https://libcat.iitd.ac.in/cgi-bin/koha/svc/search.pl?idx=&q=india&item_limit=&limit=&weight_search=1
            const kohaUrl = `${value}${term}&do=Search&weight_search=1`;
            const kohaConfig = {
                method: 'get',
                url: kohaUrl,
                httpsAgent: agent

            };
            calls.push({ label: 'Koha', request: axios.request(kohaConfig) });

            //  calls.push(axios.request(kohaConfig));
        }

        if (labels.includes('J-Gate')) {
            const result = dbLinks.find(item => item.label === "J-Gate");
            const value = result ? result.value : null;
            const jgateUrl = `${value}${term}&rows=10&page=${page}&facets=all`;

            const jgateConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: jgateUrl,
                headers: {
                    'Api-Key': 'e54d44315dab474eb71a0db1fcb9e659' // Add any required headers here
                },

            };
            //   calls.push(axios.request(jgateConfig));
            calls.push({ label: 'J-Gate', request: axios.request(kohaConfig) });

        }

        // Make API calls in parallel using Promise.all
        // Assuming you already have the `calls` array populated with axios requests

        let extractedData = [];
        let appliedFilters = [];
        let authorData = {};
        let subjectData = {};
        let itemTypeData = {};
        let publisherData = {};
        let pageDetails = {};

        let jgateSubjectData = {};
        let jgateAuthorData = {};

        let kohaAuthorData = {};
        let kohaTopicsData = {};
        let kohaITypeData = {};

        let jgateJournalData = {};
        let jgateYearFromData = {};
        let jgateDataTypeData = {};
        let jgatePublisherData = {};
        const databaseCounts = [];
        Promise.all(calls.map(call => call.request))
            .then((responses) => {
                // Loop through the responses
                responses.forEach((response, index) => {
                    const label = calls[index].label;
                    if (label === 'DSpace') {

                        const dspaceResponse = response; // Get the first response
                        const resource = logos.find(resource => resource.label === "dspace");

                        let resourceLogo = null
                        if (resource) resourceLogo = resource.logo
                        const dspaceExtractedData = dspaceResponse.data._embedded.searchResult._embedded.objects.map(obj => {
                            const metadata = obj._embedded.indexableObject.metadata;
                            const _links = obj._embedded.indexableObject._links;
                            let thumbnail = obj._embedded?.indexableObject?._embedded?.thumbnail?._links?.content?.href;
                            if (!thumbnail) thumbnail = null

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
                        extractedData = [...extractedData, ...dspaceExtractedData];
                        if (dspaceFilters) {
                            appliedFilters = [...appliedFilters, ...dspaceFilters];
                        }
                        if (dspacePageDetails) {
                            databaseCounts.push({ name: "DSpace", count: dspacePageDetails.totalElements })

                        }

                        authorData = { ...authorData, ...dspaceAuthorData }
                        subjectData = { ...subjectData, ...dspaceSubjectData }

                        itemTypeData = { ...itemTypeData, ...dspaceItemTypeData }

                        publisherData = { ...publisherData, ...dspacePublisherData }


                        pageDetails = { ...pageDetails, ...dspacePageDetails }
                        // Handle DSpace response
                        console.log(`DSpace Response ${index + 1}:`, response.data);
                        // Process DSpace-specific response logic here
                    }
                    if (label === 'J-Gate') {

                        const jgateResponse = response; // Get the second response
                        const totalPages = jgateResponse.data.data.docs_total_pages
                        const resource = logos.find(resource => resource.label === "j-gate");
                        let resourceLogo = null
                        if (resource) resourceLogo = resource.logo
                        const subjects = jgateResponse.data.data.jsonfacets?.subjects_name_l3?.buckets
                        const publisher = jgateResponse.data.data.jsonfacets?.publisher_name?.buckets
                        const journal = jgateResponse.data.data.jsonfacets?.journal_name?.buckets
                        const dataType = jgateResponse.data.data.jsonfacets?.data_type?.buckets
                        const yearFrom = jgateResponse.data.data.jsonfacets?.yearfrom?.buckets
                        const authors = jgateResponse.data.data.jsonfacets?.authors_tk?.buckets
                        if (authors && Array.isArray(authors)) {
                            let values = authors.map(item => ({
                                label: item.val,
                                count: item.count.toString(),
                                _links: {} // You can populate _links with relevant data if needed
                            }));

                            jgateAuthorData['name'] = 'authors';
                            jgateAuthorData['type'] = "j-gate";
                            jgateAuthorData['page'] = null;
                            jgateAuthorData['_links'] = null;
                            jgateAuthorData['_embedded'] = {};
                            jgateAuthorData['_embedded']['values'] = values;
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
                        if (publisher && Array.isArray(publisher)) {
                            let values = publisher.map(item => ({
                                label: item.val,
                                count: item.count.toString(),
                                _links: {} // You can populate _links with relevant data if needed
                            }));

                            jgatePublisherData['name'] = 'publisher';
                            jgatePublisherData['type'] = "j-gate";
                            jgatePublisherData['page'] = null;
                            jgatePublisherData['_links'] = null;
                            jgatePublisherData['_embedded'] = {}; // Initialize _embedded as an object
                            jgatePublisherData['_embedded']['values'] = values; // Assign values to _embedded['values']
                        }
                        if (dataType && Array.isArray(dataType)) {
                            let values = dataType.map(item => ({
                                label: item.val,
                                count: item.count.toString(),
                                _links: {} // You can populate _links with relevant data if needed
                            }));

                            jgateDataTypeData['name'] = 'data Type';
                            jgateDataTypeData['type'] = "j-gate";
                            jgateDataTypeData['page'] = null;
                            jgateDataTypeData['_links'] = null;
                            jgateDataTypeData['_embedded'] = {}; // Initialize _embedded as an object
                            jgateDataTypeData['_embedded']['values'] = values; // Assign values to _embedded['values']
                        }
                        if (journal && Array.isArray(journal)) {
                            let values = journal.map(item => ({
                                label: item.val,
                                count: item.count.toString(),
                                _links: {} // You can populate _links with relevant data if needed
                            }));

                            jgateJournalData['name'] = 'journal';
                            jgateJournalData['type'] = "j-gate";
                            jgateJournalData['page'] = null;
                            jgateJournalData['_links'] = null;
                            jgateJournalData['_embedded'] = {}; // Initialize _embedded as an object
                            jgateJournalData['_embedded']['values'] = values; // Assign values to _embedded['values']
                        }
                        if (yearFrom && Array.isArray(yearFrom)) {
                            let values = yearFrom.map(item => ({
                                label: item.val,
                                count: item.count.toString(),
                                _links: {} // You can populate _links with relevant data if needed
                            }));

                            jgateYearFromData['name'] = 'yearFrom';
                            jgateYearFromData['type'] = "j-gate";
                            jgateYearFromData['page'] = null;
                            jgateYearFromData['_links'] = null;
                            jgateYearFromData['_embedded'] = {}; // Initialize _embedded as an object
                            jgateYearFromData['_embedded']['values'] = values; // Assign values to _embedded['values']
                        }

                        if (totalPages) {
                            databaseCounts.push({ name: "J-Gate", count: totalPages * 10 })
                            if (pageDetails && pageDetails.totalElements) {
                                pageDetails.totalElements += totalPages * 10;
                            }
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
                        // Handle Koha response
                        console.log(`Koha Response ${index + 1}:`, response.data);
                        // Process Koha-specific response logic here
                    }
                    if (label === 'Koha') {

                        const kohaResponse = response; // Get the second response

                        const resource = logos.find(resource => resource.label === "koha");
                        let resourceLogo = null
                        if (resource) resourceLogo = resource.logo

                        if (kohaResponse.data[0] !== "No results found") {
                            const totalPages = kohaResponse.data.total


                            if (totalPages) {
                                databaseCounts.push({ name: "Koha", count: totalPages })
                                if (pageDetails && pageDetails.totalElements) {
                                    pageDetails.totalElements += totalPages;
                                }
                            }
                            const facets = kohaResponse.data.facet
                            // console.log(`Facet got ${facets.length}`)
                            const authorsObject = facets.find(facet => facet.label === "Authors");
                            const iTypesObject = facets.find(facet => facet.label === "Item types");
                            const topicsObject = facets.find(facet => facet.label === "Topics");
                            if (authorsObject && Array.isArray(authorsObject.facets)) {
                                const authors = authorsObject.facets
                                let values = authors.map(item => ({
                                    label: item.facet_title_value,
                                    count: item.facet_count.toString(),
                                    _links: {} // You can populate _links with relevant data if needed
                                }));

                                kohaAuthorData['name'] = 'authors';
                                kohaAuthorData['type'] = "koha";
                                kohaAuthorData['page'] = null;
                                kohaAuthorData['_links'] = null;
                                kohaAuthorData['_embedded'] = {};
                                kohaAuthorData['_embedded']['values'] = values;
                            }
                            if (iTypesObject && Array.isArray(iTypesObject.facets)) {
                                const itemsObj = iTypesObject.facets
                                let values = itemsObj.map(item => ({
                                    label: item.facet_label_value,
                                    count: item.facet_count.toString(),
                                    _links: {} // You can populate _links with relevant data if needed
                                }));

                                kohaITypeData['name'] = 'data Type';
                                kohaITypeData['type'] = "koha";
                                kohaITypeData['page'] = null;
                                kohaITypeData['_links'] = null;
                                kohaITypeData['_embedded'] = {};
                                kohaITypeData['_embedded']['values'] = values;
                            }
                            if (topicsObject && Array.isArray(topicsObject.facets)) {
                                const itemsObj = topicsObject.facets
                                let values = itemsObj.map(item => ({
                                    label: item.facet_title_value,
                                    count: item.facet_count.toString(),
                                    _links: {} // You can populate _links with relevant data if needed
                                }));

                                kohaTopicsData['name'] = 'topics';
                                kohaTopicsData['type'] = "koha";
                                kohaTopicsData['page'] = null;
                                kohaTopicsData['_links'] = null;
                                kohaTopicsData['_embedded'] = {};
                                kohaTopicsData['_embedded']['values'] = values;
                            }
                            console.log(`Koha topics ${JSON.stringify(kohaTopicsData)}`)
                            const kohaExtractedData = kohaResponse.data.results.map(item => {
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
                        // Handle Koha response
                        console.log(`Koha Response ${index + 1}:`, response.data);
                        // Process Koha-specific response logic here
                    }

                    // You can add other conditional checks for different sources if needed
                });
            })
            .catch((error) => {
                console.error('Error occurred during API requests:', error);
            });



        if (labels.includes('DSpace')) {

        }

        if (labels.includes('Koha')) {

            // Assuming jgateResponse contains similar structure for authorData and subjectData
            // Add logic to extract authorData and subjectData from jgateResponse if available
        }
        if (labels.includes('J-Gate')) {

            // Assuming jgateResponse contains similar structure for authorData and subjectData
            // Add logic to extract authorData and subjectData from jgateResponse if available
        }

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
        const kohaAuthorValues = kohaAuthorData._embedded?.values || [];

        // Merge the values arrays only if both are not null
        const mergedAuthorValues = [...authorValues, ...jgateAuthorValues, ...kohaAuthorValues];

        // Create the merged object
        const mergedAuthorObject = {
            ...authorData,
            _embedded: {
                ...authorData._embedded,
                values: mergedAuthorValues
            }
        };

        // Merge the values arrays only if both are not null

        const dpsaceItemTypeValues = itemTypeData._embedded?.values || [];
        const kohaItemTypeValues = kohaITypeData._embedded?.values || [];

        const mergedITemTypeValues = [...dpsaceItemTypeValues, ...kohaItemTypeValues];

        // Create the merged object
        const mergedItemTypeObject = {
            ...itemTypeData,
            _embedded: {
                ...itemTypeData._embedded,
                values: mergedITemTypeValues
            }
        };
        // Merge the values arrays only if both are not null
        const publisherValues = publisherData._embedded?.values || [];
        const jgatePublisherValues = jgatePublisherData._embedded?.values || [];
        const mergedPubisherValues = [...publisherValues, ...jgatePublisherValues];

        // Create the merged object
        const mergedPublisherObject = {
            ...publisherData,
            _embedded: {
                ...publisherData._embedded,
                values: mergedPubisherValues
            }
        };

        res.status(200).json({
            pageDetails,
            data: extractedData,
            authorData: mergedAuthorObject,
            subjectData: mergedSubjectObject,
            publisherData: mergedPublisherObject,
            topicsData: kohaTopicsData,
            itemTypeData: mergedItemTypeObject,
            dataType: jgateDataTypeData,
            yearFrom: jgateYearFromData,
            journal: jgateJournalData,
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
        let { startsWith, page, dbLinks, database, logos } = req.body;
        if (!startsWith) {
            return res.status(400).json({ message: 'Query term is required' });
        }
        if (startsWith === "#") {
            startsWith = "%23"
        } else if (startsWith === "All") {
            startsWith = ''
        }
        if (page < 0) {
            page = 0
        }
        const calls = [];
        const labels = dbLinks.map(item => item.label);


        const databaseCounts = [];

        if (labels.includes('DSpace')) {
            const result = dbLinks.find(item => item.label === "DSpace");
            const value = result ? result.value : null;
            const dspaceUrl = `${value}${startsWith}&sort=dc.title,ASC&page=${page}&size=10&embed=thumbnail`
            const dspaceConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: dspaceUrl
            };
            // console.log(dspaceUrl)
            calls.push(axios.request(dspaceConfig));
        }
        if (labels.includes('Koha') && startsWith !== "%23") {
            const result = dbLinks.find(item => item.label === "Koha");
            const value = result ? result.value : null;
            const kohaUrl = `${value}${startsWith}&do=Search`;
            const kohaConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: kohaUrl,
                httpsAgent: agent
            };
            calls.push(axios.request(kohaConfig));
        }
        if (labels.includes('J-Gate')) {
            const result = dbLinks.find(item => item.label === "J-Gate");
            const value = result ? result.value : null;
            const jgateUrl = `${value}${startsWith}&page=${page}&rows=10&search_mode=startswith`;
            console.log("jgateUrl" + jgateUrl)

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
        if (labels.includes('DSpace')) {
            const dspaceResponse = responses.shift(); // Get the first response
            let resourceLogo = null
            const resource = logos.find(resource => resource.label === "dspace");

            if (resource) resourceLogo = resource.logo
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

            if (dspacePageDetails) {
                databaseCounts.push({ name: "DSpace", count: dspacePageDetails.totalElements })

            }


            pageDetails = dspacePageDetails

            console.log(JSON.stringify(dspacePageDetails))
        }
        if (labels.includes('Koha') && startsWith !== "%23") {
            const kohaResponse = responses.shift(); // Get the second response
            // console.log(JSON.stringify(jgateResponse.data.data))
            if (kohaResponse.data[0] !== "No results found" && kohaResponse.data.results !== undefined) {

                const resource = logos.find(resource => resource.label === "koha");
                let resourceLogo = null
                if (resource) resourceLogo = resource.logo

                const totalPages = kohaResponse.data.total


                if (totalPages) {
                    databaseCounts.push({ name: "Koha", count: totalPages })

                    if (pageDetails && pageDetails.totalElements) {
                        pageDetails.totalElements += totalPages;
                    }

                }
                console.log(JSON.stringify(kohaResponse.data.results))
                const kohaExtractedData = kohaResponse.data.results.map(item => {
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
        }
        if (labels.includes('J-Gate')) {
            const jgateResponse = responses.shift(); // Get the second response
            // console.log(JSON.stringify(jgateResponse.data.data))
            const totalPages = jgateResponse.data.data.docs_total_pages
            if (totalPages) {
                databaseCounts.push({ name: "J-Gate", count: totalPages * 10 })
                if (pageDetails && pageDetails.totalElements) {
                    pageDetails.totalElements += totalPages * 10;
                }
            }
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
        res.status(200).json({ pageDetails, data: extractedData, databaseCounts });

    } catch (error) {
        console.error('Error processing data:', error);

        // Check if the error response has a message, otherwise use a generic error message
        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};



exports.getResouceCategory = async (req, res) => {
    try {
        const { libraryId } = req.query;

        if (!libraryId) {
            return res.status(400).json({ message: 'libraryId is required' });
        }
        const lib = "5ef2d116b414a5fcecdb4172"
        const categoryUrl = `https://iras-api.informaticsglobal.com/resourceCategories?limit=50&library_id=${lib}`;
        const resourceUrl = `https://api.informaticsglobal.com/resources?limit=50&library_id=${lib}`;

        const [categoryResponse, resourceResponse] = await Promise.all([
            axios.get(categoryUrl),
            axios.get(resourceUrl)
        ]);
        //  console.log(categoryResponse.data)
        const categoriesData = categoryResponse.data.data; // Assuming this is the data property
        const resourcesData = resourceResponse.data.docs; // Assuming this is the data property
        //  console.log(resourcesData)

        // Format categories
        const formattedCategories = categoriesData.map(obj => ({
            _id: obj["_id"],
            displayName: obj["DisplayName"],
            library: obj["Library"]
        }));

        // Format resources (example fields, adjust as per your API structure)
        // Map resources to categories using their _id and ResourceCategories field
        const mergedData = formattedCategories.map(category => {
            // Use filter to get an array of all resources that match the category
            // Assuming resourcesData contains the list of resources and category is defined
            const relatedResources = resourcesData
                .filter(resource => resource.ResourceCategories === category._id)
                .map(resource => {
                    // Add the 'url' field to each resource object
                    const metaString = resource['Meta']
                    //  console.log(resource['Meta'])
                    let url = ""
                    // Regular expression to match URLs starting with https://
                    const urlRegex = /(https:\/\/[^\s]+)/;

                    // Match the first URL found in the string
                    const firstURLMatch = metaString.match(urlRegex);

                    if (firstURLMatch) {
                        url = firstURLMatch[0];
                        //   console.log(url); // This will log the first URL found
                    } else {
                        console.log("No URL found");
                    }
                    return {
                        ...resource, // Spread the existing resource properties
                        url: url
                    };
                });

            //     console.log(relatedResources);

            return {
                ...category,
                details: relatedResources.length > 0 ? relatedResources : [] // If there are related resources, return them, otherwise return an empty array
            };
        });


        // console.log(JSON.stringify(mergedData))

        res.status(200).json({ categories: mergedData });

    } catch (error) {
        console.error('Error processing data:', error);

        const errorMessage = error.response?.data?.message || 'Internal Server Error';
        res.status(error.response?.status || 500).json({ message: errorMessage, error });
    }
};