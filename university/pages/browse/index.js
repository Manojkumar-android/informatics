import { useState, useContext } from "react";
import ErrorBoundary from '../errorBoundary';

import BrowseContext from "../../contexts/browseContext";
import Footer from '../footer_garden_city';
import TopBarWithoutLogout from '../topbarwithoutlogout';
import List from './list';
import Alphabet from './alphabets';
import Sidebar from './filter';

const Browse = () => {

    const { } = useContext(BrowseContext);



    return (

        <>
            <TopBarWithoutLogout />
            {/* <SecondTopBar /> */}
            <Alphabet />

            <div className="flex ">
                <div className=" w-1/4 bg-gray-100">
                    <Sidebar />
                </div>
                <main className="w-3/4 p-4 bg-gray-100">
                    <ErrorBoundary>
                        <List />
                    </ErrorBoundary>
                </main>
            </div>



            <Footer />
        </ >
    );
}

export default Browse;
