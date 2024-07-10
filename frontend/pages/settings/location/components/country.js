import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { Column } from 'primereact/column'
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import { getCountry, createCountry, updateCountry, updateCountryStatus } from '../../../../actions/settings/location_action';
import Add from './add';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const Country = () => {

    const cols = [{ field: 'sno', header: 'Line.No' },

    { field: 'name', header: 'Country' },
    ]
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [countries, setCountries] = useState(false)
    useEffect(() => {
        loadCountries()
    }, []);

    const loadCountries = () => {
        getCountry().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCountries(data)
            }
        });
    }
    const iconformat = (row) => {
        const handleDelete = () => {
            let title = `In Active Country ${row.name} ?`
            if (row.deleteStatus) {
                title = `Active Country ${row.name} ?`
            }
            Swal.fire({
                title: title,
                text: '',
                icon: 'question',
                confirmButtonText: 'Yes',
                showCancelButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    const st = { status: !row.deleteStatus }

                    updateCountryStatus(row._id, st).then(data => {
                        if (data.error) {
                            toast.error(data.message)
                        } else {
                            toast.success(data.message)

                            loadCountries()

                        }
                    });
                }
            })

        }
        const handleEdit = () => {
            setEdit(true)
            setName(row.name)
            setId(row._id)

        }
        return (
            <span className="space-x-5">

                {row.deleteStatus
                    ?
                    <FaToggleOn size="20px" color='red' data-tooltip-id='1' className=' cursor-pointer' data-tooltip-content="Update Status" onClick={() => handleDelete()}></FaToggleOn>
                    :
                    <FaToggleOff size="20px" color='red' data-tooltip-id='1' className=' cursor-pointer' data-tooltip-content="Update Status" onClick={() => handleDelete()}></FaToggleOff>
                }
                <FiEdit2 size="18px" color='blue' className=' cursor-pointer' data-tooltip-id='2' data-tooltip-content="Edit" onClick={() => handleEdit()}></FiEdit2>
                <Tooltip id='2' />
                <Tooltip id='1' />
            </span>
        )
    }
    const statusformat = (row) => {
        if (row.deleteStatus) {
            return (
                <span >

                    <button className=' bg-red-500 text-white border border-none px-2 py-2'>In Active</button>
                </span>
            )
        } else {
            return (
                <span >

                    <button className=' bg-green-500 text-white border border-none px-2 py-2'> Active</button>
                </span>
            )
        }

    }
    const handleClose = () => {

        setAdd(false)
    }
    const handleEditClose = () => {

        setEdit(false)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const data = { name }
        createCountry(data).then(data => {
            if (data.error) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
                setAdd(false)
                loadCountries()

            }
        });
    }
    const onEditSubmit = (e) => {
        e.preventDefault();
        const data = { name }
        updateCountry(id, data).then(data => {
            if (data.error) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
                setEdit(false)
                loadCountries()

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
            <ToastContainer autoClose={2000} />
            <Add
                visible={add}
                handleClose={handleClose}
                header={"Add New Country"}
                content={
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='p-4'>
                            <div>
                                <div className='text-gray-500 mb-2'>Country Name</div>
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Country Name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="cursor-pointer border-0 bg-secondary  text-[16px]   mt-6  py-3 px-5   text-white rounded-md  "
                                type='submit'>

                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                } />
            <Add
                visible={edit}
                handleClose={handleEditClose}
                header={"Edit Country"}
                content={
                    <form onSubmit={(e) => onEditSubmit(e)}>
                        <div className='p-4'>
                            <div>
                                <div className='text-gray-500 mb-2'>Country Name</div>
                                <input
                                    type="text"
                                    className="custom-input"
                                    placeholder="Enter Country Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                className="cursor-pointer border-0 bg-secondary  text-[16px]   mt-6  py-3 px-5   text-white rounded-md  "
                                type='submit'>

                                <span>Submit</span>
                            </button>
                        </div>
                    </form>
                } />
            <DataTable
                value={countries}
                paginator
                rows={5}
                className=""
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}

                globalFilterFields={['name']}>
                {cols.map((col, index) => (
                    <Column key={index} field={col.field} header={col.header} />
                ))}
                <Column body={statusformat} header="Status"></Column>
                <Column body={iconformat} header="Actions"></Column>


            </DataTable>

        </div>
    )
}

export default Country;