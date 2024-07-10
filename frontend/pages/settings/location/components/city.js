import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column'
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { getCities, createCity } from '../../../../actions/settings/location_action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

import Add from './add';
const City = () => {

    const cols = [{ field: 'sno', header: 'Line.No' },
    { field: 'name', header: 'City' },
    { field: 'country.name', header: 'Country' },
    { field: 'state.name', header: 'State' },

    ]
    const [add, setAdd] = useState(false)
    const [cities, setCities] = useState([])

    const [countries, setCountries] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState([])

    const [states, setStates] = useState([])
    const [selectedState, setSelectedState] = useState([])

    const [name, setName] = useState('')

    useEffect(() => {
        loadCities()
        setSelectedCountry([])
        setSelectedState([])
    }, []);
    const loadCities = () => {
        getCities().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCountries(data.countries)
                setStates(data.states)

                setCities(data.cities)
            }
        });
    }
    const iconformat = (row) => {
        return (
            <span className="space-x-5">

                <FaToggleOff size="20px" color='red'></FaToggleOff>
                <FiEdit2 size="18px" color='blue'></FiEdit2>
            </span>
        )
    }

    const handleClose = () => {

        setAdd(false)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { name, country: selectedCountry.value, state: selectedState.value }
        createCity(data).then(res => {
            if (res.error) {
                setAdd(false)

                toast.error(res.message)
            } else {
                toast.success(res.message)
                setAdd(false)
                loadCities()

            }
        });
    }
    return (
        <div className="col-md-12 ">
            <button
                className="flex h-12 cursor-pointer border-0 items-center justify-center hover:bg-primary-opacity-80 focus:bg-primary bg-primary px-4 mb-3 text-[18px] text-white rounded-md  "
                onClick={() => setAdd(true)}
            >


                <FiPlusCircle size={20} />
                <span className='mx-2' >Add</span>

            </button>
            <ToastContainer autoClose={2500} />

            <Add
                visible={add}
                handleClose={handleClose}
                header={"Add New State"}
                content={
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='p-4'>
                            <div className='text-gray-500 mb-2'>Country </div>

                            <Select
                                value={selectedCountry}
                                options={countries}
                                onChange={(e) => setSelectedCountry(e)}
                                placeholder="Select Country"
                                className='mb-3'
                                required

                            />

                            <div className='text-gray-500 mb-2'>State </div>

                            <Select
                                value={selectedState}
                                options={states}
                                onChange={(e) => setSelectedState(e)}
                                placeholder="Select State"
                                className='mb-3'
                                required

                            />

                            <div className='text-gray-500 mb-2'>City Name</div>

                            <input
                                type="text"
                                className="custom-input mb-3"
                                placeholder="Enter City Name"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div>
                                <button
                                    className="cursor-pointer border-0 bg-secondary  text-[16px]  mt-3    py-3 px-5   text-white rounded-md  "
                                    type='submit'>

                                    <span>Submit</span>
                                </button>
                            </div>
                        </div>
                    </form>
                } />
            <DataTable
                value={cities}
                paginator
                rows={5}
                className=""
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}

                globalFilterFields={['name']}>
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
                <Column body={iconformat} header="Actions"></Column>


            </DataTable>

        </div>
    )
}

export default City;