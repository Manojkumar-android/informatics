import React, { createContext, useState } from 'react';

const ItemTypeContext = createContext();

export const ItemTypeContextProvider = ({ children }) => {
    const [itemType, setItemType] = useState({})

    const handleItemTypeResponse = (res) => {
        if (!res.itemTypeData || !res.itemTypeData._embedded || !res.itemTypeData._embedded.values) {
            return;
        }
        let { page, _links, _embedded } = res.itemTypeData;
        //  

        console.log('Invalid itemTypeData:', res.itemTypeData);

        let authorFilters = []
        if (res.appliedFilters) {
            authorFilters = res.appliedFilters.filter(filter => filter.filter === 'itemtype');
        }
        //  alert(JSON.stringify(authorFilters))
        const updatedValues = _embedded.values.map(item => ({
            ...item,
            checked: authorFilters.some(filter => filter.label === item.label) // Check if the label matches
        }));
        setItemType(prevState => ({
            ...prevState,
            label: "Item Type",
            page: page,
            links: _links,
            values: [...(prevState.values || []), ...updatedValues],

        }));
        // alert(JSON.stringify(subject))


    }
    const clearItemTypeValues = () => {
        setItemType(prevState => ({
            ...prevState,
            page: null,
            links: null,
            values: [],


        }));
    };
    return (
        <ItemTypeContext.Provider
            value={{ itemType, setItemType, handleItemTypeResponse, clearItemTypeValues }}
        >
            {children}
        </ItemTypeContext.Provider>
    );
}
export default ItemTypeContext;