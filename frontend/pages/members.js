import React from "react";
import Topbar from "./topbar";
import MainScreen from "./mainScreen";
const Members = () => {
    return (
        <div >

            <MainScreen children={
                <div className="p-6">
                    <div className=" text-header font-semibold">Members</div>
                </div>
            } />


        </div>
    )

}

export default Members;