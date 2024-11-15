
import React, { createContext, useState } from 'react';

const AuthorContext = createContext();


export const AuthorContextProvider = ({ children }) => {
    const [author, setAuthorData] = useState({})

    const clearAuthorValues = () => {
        setAuthorData(prevState => ({
            ...prevState,
            label: "Author",
            page: null,
            links: null,
            searchTerm: null,
            searchItems: [],
            values: [],


        }));
    };
    const handleAuthorSearchResponse = (res) => {
        if (!res.authorData || !res.authorData._embedded || !res.authorData._embedded.values) {
            console.warn('Invalid authorData:', res.authorData);
            return;
        }
        let { _embedded } = res.authorData;
        //  
        const updatedValues = _embedded.values.map(item => `${item.label}(${item.count})`);
        setAuthorData(prevState => ({
            ...prevState,
            searchItems: updatedValues,


        }));

    }
    const handleAuthorResponse = (res) => {
        if (!res.authorData || !res.authorData._embedded || !res.authorData._embedded.values) {
            console.warn('Invalid authorData:', res.authorData);
            return;
        }
        let { page, _links, _embedded } = res.authorData;
        //  
        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'author');
        }
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));

        setAuthorData(prevState => ({
            ...prevState,
            label: "Author",
            page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],


        }));
        console.log(JSON.stringify(updatedValues))

        //alert(JSON.stringify(author))
    }
    const getCheckedAuthor = () => {
        if (!author.values) return;
        const checkedValues = author.values
            .filter(item => item.checked)
            .map(item => item.value);

        return checkedValues;
    };
    return (
        <AuthorContext.Provider
            value={{
                author,
                setAuthorData,
                handleAuthorResponse,
                clearAuthorValues,
                getCheckedAuthor,
                handleAuthorSearchResponse
            }}
        >
            {children}
        </AuthorContext.Provider>
    );
}

export default AuthorContext;