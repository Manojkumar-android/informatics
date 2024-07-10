import React, { useState, useEffect } from "react";
import MainScreen from "../mainScreen";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FiEdit2, FiPlusCircle } from "react-icons/fi";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import {
    getCollege,
    createCollege,
    updateCollege,
    updateCollegeStatus
} from '../../actions/settings/college';
import Add from '../settings/location/components/add';
import { ToastContainer, toast } from 'react-toastify';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const College = () => {
    const cols = [{ field: 'sno', header: 'Line.No' },

    { field: 'name', header: 'College' },
    ]
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [college, setCollege] = useState(false)
    useEffect(() => {
        loadCollege()
    }, []);

    const loadCollege = () => {
        getCollege().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCollege(data)
            }
        });
    }

    const iconformat = (row) => {
        const handleDelete = () => {
            let title = `In Active College ${row.name} ?`
            if (row.deleteStatus) {
                title = `Active College ${row.name} ?`
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

                    updateCollegeStatus(row._id, st).then(data => {
                        if (data.error) {
                            toast.error(data.message)
                        } else {
                            toast.success(data.message)

                            loadCollege()

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
                    <i color='red' data-tooltip-id='1' className=' cursor-pointer' data-tooltip-content="Update Status" onClick={() => handleDelete()}><FaToggleOn size="20px" ></FaToggleOn></i>
                    :
                    <i data-tooltip-id='1' className=' cursor-pointer' data-tooltip-content="Update Status" onClick={() => handleDelete()}> <FaToggleOff size="20px" color='red' ></FaToggleOff></i>
                }
                <i className=' cursor-pointer' data-tooltip-id='2' data-tooltip-content="Edit" onClick={() => handleEdit()}> <FiEdit2 size="18px" color='blue' ></FiEdit2></i>
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
        createCollege(data).then(data => {
            if (data.error) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
                setAdd(false)
                loadCollege()

            }
        });
    }
    const onEditSubmit = (e) => {
        e.preventDefault();
        const data = { name }
        updateCollege(id, data).then(data => {
            if (data.error) {
                toast.error(data.message)
            } else {
                toast.success(data.message)
                setEdit(false)
                loadCollege()

            }
        });
    }
    return (
        <div >

            <MainScreen children={

                <div className="p-6 space-y-10 ">
                    <div className="text-header font-semibold">Colleges</div>






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
                            header={"Add New College"}
                            content={
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <div className='p-4'>
                                        <div>
                                            <div className='text-gray-500 mb-2'>College</div>
                                            <input
                                                type="text"
                                                className="custom-input"
                                                placeholder="Enter College Name"
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
                            header={"Edit College"}
                            content={
                                <form onSubmit={(e) => onEditSubmit(e)}>
                                    <div className=' p-4'>
                                        <div>
                                            <div className='text-gray-500 mb-2'>College</div>

                                            <input
                                                type="text"
                                                className="custom-input "
                                                placeholder="Enter College Name"
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
                            value={college}
                            paginator
                            rows={10}
                            className=""
                            rowsPerPageOptions={[10, 20, 30, 50]}
                            tableStyle={{ minWidth: '50rem' }}

                            globalFilterFields={['name']}>
                            {cols.map((col, index) => (
                                <Column key={index} field={col.field} header={col.header} />
                            ))}
                            <Column body={statusformat} header="Status"></Column>
                            <Column body={iconformat} header="Actions"></Column>


                        </DataTable>

                    </div>
                </div>
            }>

            </MainScreen>
        </div>)

}
export default College;