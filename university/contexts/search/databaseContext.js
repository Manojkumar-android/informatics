
import React, { createContext, useState, useEffect } from 'react';
import { getAssignedResource }
    from "../../actions/userAction";
const DatabaseContext = createContext();


export const DatabaseContextProvider = ({ children }) => {
    const [database, setDatabase] = useState(null)
    const [resources, setResources] = useState([])

    useEffect(() => {
        getAssignedResource().then(res => {

            if (res.error) {
                console.log(res.error);
            } else {
                const newValues = res.resources.map(resource => ({
                    label: resource.name,
                    count: null,
                    value: resource.name.toLowerCase(), // Or another unique identifier if needed
                    checked: true // or false, based on your logic
                }));
                setResources(res.resources)
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
            const matchingResponse = resources.find(res => res.name === resource.name);

            return {
                label: resource.name,
                count: matchingResponse ? matchingResponse.count : null, // Use the count from the response if a match is found
                value: resource.name.toLowerCase(), // Or another unique identifier if needed
                checked: true // or false, based on your logic
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
            value={{ database, setDatabase, handleDatabaseCount }}
        >
            {children}
        </DatabaseContext.Provider>
    );
}

export default DatabaseContext;