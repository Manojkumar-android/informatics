import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column'
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { getStates, createState } from '../../../../actions/settings/location_action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from "react-select";

import Add from './add';
const State = () => {

    const cols = [{ field: 'sno', header: 'Line.No' },
    { field: 'name', header: 'State' },

    { field: 'country.name', header: 'Country' },
    ]
    const [add, setAdd] = useState(false)
    const [states, setStates] = useState([])
    const [countries, setCountries] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState([])

    const [name, setName] = useState('')

    useEffect(() => {
        loadStates()
        setSelectedCountry([])
    }, []);
    const loadStates = () => {
        getStates().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCountries(data.countries)

                setStates(data.states)
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
        const data = { name, country: selectedCountry.value }
        createState(data).then(res => {
            if (res.error) {
                setAdd(false)

                toast.error(res.message)
            } else {
                toast.success(res.message)
                setAdd(false)
                loadStates()

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

                            <div className='text-gray-500 mb-2'>State Name</div>

                            <input
                                type="text"
                                className="custom-input mb-3"
                                placeholder="Enter State Name"
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
                value={states}
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

export default State;