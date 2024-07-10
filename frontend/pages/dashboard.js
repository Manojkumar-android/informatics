import React from "react";
import Topbar from "./topbar";
import MainScreen from "./mainScreen";
const Dashboard = () => {
    return (
        <div >

            <MainScreen children={
                <div className="p-6">
                    <div className=" text-header font-semibold">Dashboard</div>
                </div>
            } />


        </div>
    )

}

export default Dashboard;