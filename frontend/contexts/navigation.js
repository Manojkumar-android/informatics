import React, { createContext, useState, useEffect } from "react";
const NavigationContext = createContext();
export const NavigationContextProvider = ({ children }) => {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <NavigationContext.Provider
            value={{
                collapsed,
                setCollapsed
            }}>
            {children}
        </NavigationContext.Provider>
    )
}
export default NavigationContext;