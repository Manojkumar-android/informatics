import React from "react";
import Topbar from "./topbar";
import dynamic from 'next/dynamic'

const Sidebar = dynamic(() => import('./sidebar'), { ssr: false })

import { NavigationContextProvider } from "../contexts/navigation";
const MainScreen = ({ children }) => {
    return (
        <div className="flex  h-screen">
            <Sidebar />
            <div className="flex flex-col w-full">
                <Topbar />
                {children}
            </div>
        </div>

    )

}

export default MainScreen;