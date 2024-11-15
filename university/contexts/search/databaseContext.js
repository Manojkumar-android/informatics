
import React, { createContext, useState, useEffect } from 'react';
import { getAssignedResource }
    from "../../actions/userAction";
const DatabaseContext = createContext();


export const DatabaseContextProvider = ({ children }) => {
    const [database, setDatabase] = useState(null)
    const [logos, setLogos] = useState([])
    const [resources, setResources] = useState([])
    const [selected, setSelected] = useState('All');

    useEffect(() => {
        getAssignedResource().then(res => {

            if (res.error) {
                console.log(res.error);
            } else {
                const newValues = res.resources.map(resource => ({
                    label: resource.name,
                    type: resource.database,
                    browseApiLink: resource.browseApiLink,
                    searchApiLink: resource.searchApiLink,
                    searchHeader: resource.searchHeader,
                    count: null,
                    value: resource.database.toLowerCase(), // Or another unique identifier if needed
                    checked: true
                }));
                const newLogos = res.resources.map(resource => ({
                    label: resource.database.toLowerCase(),
                    logo: resource.logo
                }));
                setResources(res.resources)
                setLogos(newLogos)
                setDatabase(prevState => ({
                    ...prevState,
                    label: "Database",
                    values: newValues
                }));
            }
        })
    }, []);
    const handleDatabaseCount = (res) => {

        const newValues = resources.map(resource => {
            // Find the matching response object
            const matchingResponse = res.databaseCounts.find(item => item.name === resource.database);
            // console.log(resource.name)
            // console.log(res.databaseCounts)
            return {
                label: resource.name,
                type: resource.database,
                browseApiLink: resource.browseApiLink,
                searchApiLink: resource.searchApiLink,
                searchHeader: resource.searchHeader,

                count: matchingResponse ? matchingResponse.count : null, // Use the count from the response if a match is found
                value: resource.database.toLowerCase(),
                disable: false, // Or another unique identifier if needed
                checked: matchingResponse ? true : false // or false, based on your logic
            };
        });

        setDatabase(prevState => ({
            ...prevState,
            label: "Database",
            values: newValues
        }));


    }
    return (
        <DatabaseContext.Provider
            value={{ logos, database, setDatabase, handleDatabaseCount, resources, selected, setSelected }}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

export default DatabaseContext;