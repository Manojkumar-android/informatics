import React, { createContext, useState } from 'react';

const PublisherContext = createContext();

export const PublisherContextProvider = ({ children }) => {
    const [publisher, setPublisher] = useState({})

    const handlePublisherResponse = (res) => {
        if (!res.publisherData || !res.publisherData._embedded || !res.publisherData._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.publisherData;
        //  

        console.log('Invalid publisherData:', res.publisherData);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'publisher');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setPublisher(prevState => ({
            ...prevState,
            label: "Publisher",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const clearPublisherValues = () => {
        setPublisher(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <PublisherContext.Provider
            value={{ publisher, setPublisher, handlePublisherResponse, clearPublisherValues }}
        >
            {children}
        </PublisherContext.Provider>
    );
}
export default PublisherContext;