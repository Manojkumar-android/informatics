
import React, { createContext, useState } from 'react';

const SubjectContext = createContext();


export const SubjectContextProvider = ({ children }) => {
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
    const clearSubjectValues = () => {
        setSubject(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <SubjectContext.Provider
            value={{ subject, setSubject, handleSubjectResponse, clearSubjectValues }}
        >
            {children}
        </SubjectContext.Provider>
    );
}

export default SubjectContext;