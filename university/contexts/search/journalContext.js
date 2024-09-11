import React, { createContext, useState } from 'react';

const JournalContext = createContext();

export const JournalContextProvider = ({ children }) => {
    const [journals, setJournals] = useState({})

    const handleJournalsResponse = (res) => {
        if (!res.journal || !res.journal._embedded || !res.journal._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.journal;
        //  

        console.log('Invalid journal:', res.journal);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'journal');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setJournals(prevState => ({
            ...prevState,
            label: "Journals",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const clearJournalsValues = () => {
        setJournals(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <JournalContext.Provider
            value={{ journals, setJournals, handleJournalsResponse, clearJournalsValues }}
        >
            {children}
        </JournalContext.Provider>
    );
}
export default JournalContext;