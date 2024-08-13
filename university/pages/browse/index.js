import { useState, useContext } from "react";

import BrowseContext from "../../contexts/browseContext";
import Footer from '../footer_garden_city';
import TopBarWithoutLogout from '../topbarwithoutlogout';
import List from './list';

const Browse = () => {

    const { } = useContext(BrowseContext);



    return (
        <div className="p-4">
            <TopBarWithoutLogout />
            {/* <SecondTopBar /> */}
            <div className="bg-gray-100 text-black flex flex-col items-center space-y- p-4">

                <div className="flex w-full">
                    {/* <aside className="w-1/4 bg-gray-100" >
                        <Sidebar />
                    </aside > */}
                    <main className="px-4 bg-gray-100 w-full">
                        <List />
                    </main>

                </div >
            </div >



            <Footer />
        </div >
    );
}

export default Browse;
