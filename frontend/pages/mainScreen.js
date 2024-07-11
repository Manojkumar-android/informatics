import React from "react";
import Topbar from "./topbar";
import dynamic from 'next/dynamic'
import Head from 'next/head';

const Sidebar = dynamic(() => import('./sidebar'), { ssr: false })

import { NavigationContextProvider } from "../contexts/navigation";
const MainScreen = ({ children, page }) => {
    return (
        <>
            <Head>
                <title>{page}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="title" content={page} />
                <meta property="og:image" content="/assets/icons/short_logo.png" />
                <meta itemprop="image" content="/assets/icons/short_logo.png"></meta>
                <meta property="og:image:width" content="200" />
                <meta property="og:image:height" content="200" />

            </Head>
            <div className="flex  h-screen ">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <Topbar />
                    {children}
                </div>
            </div>
        </>

    )

}

export default MainScreen;