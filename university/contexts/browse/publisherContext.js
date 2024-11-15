import React, { createContext, useState } from 'react';

const BrowsePublisherContext = createContext();

export const BrowsePublisherContextProvider = ({ children }) => {
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
    const handlePublisherSearchResponse = (res) => {
        if (!res.publisherData || !res.publisherData._embedded || !res.publisherData._embedded.values) {
            console.log('Invalid publisherData:', res.publisherData);
            return;
        }
        let { _embedded } = res.publisherData;
        //  
        const updatedValues = _embedded.values.map(item => `${item.label}(${item.count})`);
        setPublisher(prevState => ({
            ...prevState,
            searchItems: updatedValues,

        }));

    }
    const clearPublisherValues = () => {
        setPublisher(prevState => ({
            ...prevState,
            page: null,
            links: null,
            searchTerm: null,
            searchItems: [],
            values: [],


        }));
    };
    return (
        <BrowsePublisherContext.Provider
            value={{
                publisher,
                setPublisher,
                handlePublisherResponse,
                clearPublisherValues,
                handlePublisherSearchResponse
            }}
        >
            {children}
        </BrowsePublisherContext.Provider>
    );
}
export default BrowsePublisherContext;