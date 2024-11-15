import React, { createContext, useState } from 'react';

const TopicsContext = createContext();

export const TopicsContextProvider = ({ children }) => {
    const [topics, setTopics] = useState({})

    const handleTopicsResponse = (res) => {
        if (!res.topicsData || !res.topicsData._embedded || !res.topicsData._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.topicsData;
        //  

        console.log('Invalid handleTopicsResponse:', res.topicsData);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'topics');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setTopics(prevState => ({
            ...prevState,
            label: "Topics",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const clearTopicsValues = () => {
        setTopics(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <TopicsContext.Provider
            value={{ topics, setTopics, handleTopicsResponse, clearTopicsValues }}
        >
            {children}
        </TopicsContext.Provider>
    );
}
export default TopicsContext;