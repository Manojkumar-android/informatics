import React, { createContext, useState } from 'react';

const YearFromContext = createContext();

export const YearFromContextContextProvider = ({ children }) => {
    const [yearFrom, setYearFrom] = useState({})

    const handleYearFromResponse = (res) => {
        if (!res.yearFrom || !res.yearFrom._embedded || !res.yearFrom._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.yearFrom;
        //  

        console.log('Invalid setYearFrom:', res.yearFrom);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'yearFrom');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setYearFrom(prevState => ({
            ...prevState,
            label: "Year From",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const clearYearFromValues = () => {
        setYearFrom(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <YearFromContext.Provider
            value={{ yearFrom, setYearFrom, handleYearFromResponse, clearYearFromValues }}
        >
            {children}
        </YearFromContext.Provider>
    );
}
export default YearFromContext;