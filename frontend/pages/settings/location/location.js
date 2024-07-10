import React, { useState, useEffect } from "react";
import Topbar from "../../topbar";
import MainScreen from "../../mainScreen";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiEdit2 } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import Country from "./components/country";
import State from "./components/state";
import City from "./components/city";
import Pincode from "./components/pincode";

import { getLocationCounts } from "../../../actions/settings/location_action";
const Location = () => {
    const active = "flex  justify-between w-1/4 text-subheader  bg-secondary p-3 shadow-lg rounded-lg cursor-pointer"
    const inactive = "flex justify-between w-1/4 text-subheader text-black bg-white border-solid border-gray-300 border p-3 shadow-lg rounded-lg cursor-pointer hover:animate-blink"

    const [type, setType] = useState(0)
    const [countryCount, setCountryCount] = useState(0)
    const [stateCount, setStateCount] = useState(0)
    const [cityCount, setCityCount] = useState(0)
    const [pincodeCount, setPincodeCount] = useState(0)
    useEffect(() => {
        loadLocationCounts()
    }, []);

    const loadLocationCounts = () => {
        getLocationCounts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCountryCount(data.country)
                setStateCount(data.state)
                setCityCount(data.city)
                setPincodeCount(data.pincode)
            }
        });
    }
    useEffect(() => {

    }, [type]);

    return (
        <div >

            <MainScreen children={

                <div className="p-6 space-y-10 ">
                    <div className="text-header font-semibold">Location</div>

                    <div className="flex space-x-10  text-white">
                        <div className={type == 0 ? active : inactive} onClick={() => setType(0)}>
                            <div>Country</div>
                            <div>{countryCount}</div>

                        </div>
                        <div className={type == 1 ? active : inactive} onClick={() => setType(1)}>
                            <div>State</div>
                            <div >{stateCount}</div>


                        </div>
                        <div className={type == 2 ? active : inactive} onClick={() => setType(2)}>
                            <div>City</div>
                            <div >{cityCount}</div>
                        </div>
                        <div className={type == 3 ? active : inactive} onClick={() => setType(3)}>
                            <div>Pincode</div>
                            <div >{pincodeCount}</div>
                        </div>

                    </div>

                    {type == 0 &&
                        < Country />
                    }
                    {type == 1 &&
                        < State />
                    }

                    {type == 2 &&
                        < City />
                    }
                    {type == 3 &&
                        < Pincode />
                    }
                </div>
            } />


        </div>
    )

}

export default Location;