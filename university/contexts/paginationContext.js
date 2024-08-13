import React, { createContext, useState } from 'react';

const PaginationContext = createContext();

export const PaginationContextProvider = ({ children }) => {
    const [pageDetails, setPageDetails] = useState({
        number: 1,
        size: 0,
        totalPages: 0,
        totalElements: 0,
        pageCounter: 0
    });

    return (
        <PaginationContext.Provider value={{ pageDetails, setPageDetails }}>
            {children}
        </PaginationContext.Provider>
    );
};

export default PaginationContext;
