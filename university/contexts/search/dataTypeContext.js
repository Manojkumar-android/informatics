import React, { createContext, useState } from 'react';

const DataTypeContext = createContext();

export const DataTypeContextProvider = ({ children }) => {
    const [dataType, setDataType] = useState({})

    const handleDataTypeResponse = (res) => {
        if (!res.dataType || !res.dataType._embedded || !res.dataType._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.dataType;
        //  

        console.log('Invalid handleDataTypeResponse:', res.dataType);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'dataType');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setDataType(prevState => ({
            ...prevState,
            label: "Data Type",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const clearDataTypeValues = () => {
        setDataType(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <DataTypeContext.Provider
            value={{ dataType, setDataType, handleDataTypeResponse, clearDataTypeValues }}
        >
            {children}
        </DataTypeContext.Provider>
    );
}
export default DataTypeContext;