
import React, { createContext, useState } from 'react';

const BrowseSubjectContext = createContext();


export const BrowseSubjectContextProvider = ({ children }) => {
    const [subject, setSubject] = useState({})
    const handleSubjectResponse = (res) => {
        if (!res.subjectData || !res.subjectData._embedded || !res.subjectData._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.subjectData;
        //  

        console.log('Invalid authorData:', res.subjectData);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'subject');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setSubject(prevState => ({
            ...prevState,
            label: "Subject",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const handleSubjectSearchResponse = (res) => {
        if (!res.subjectData || !res.subjectData._embedded || !res.subjectData._embedded.values) {
            console.log('Invalid subjectData:', res.subjectData);
            return;
        }
        let { _embedded } = res.subjectData;
        //  
        const updatedValues = _embedded.values.map(item => `${item.label}(${item.count})`);
        setSubject(prevState => ({
            ...prevState,
            searchItems: updatedValues,


        }));

    }
    const clearSubjectValues = () => {
        setSubject(prevState => ({
            ...prevState,
            page: null,
            links: null,
            searchTerm: null,
            searchItems: [],
            values: [],


        }));
    };
    return (
        <BrowseSubjectContext.Provider
            value={{
                subject,
                setSubject,
                handleSubjectResponse,
                clearSubjectValues,
                handleSubjectSearchResponse
            }}
        >
            {children}
        </BrowseSubjectContext.Provider>
    );
}

export default BrowseSubjectContext;