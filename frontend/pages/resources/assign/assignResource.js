import React, { useState, useEffect } from "react";
import MainScreen from "../../mainScreen";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToastContainer, toast } from 'react-toastify';
import { } from '../../../actions/admin/assignResourceAction';
import { getResource } from '../../../actions/admin/resouceAction';
import Link from "next/link";
import { FileUpload } from 'primereact/fileupload';
import Router from "next/router";
import { getUniversityNames, getAssignedDetails, updateResources } from '../../../actions/admin/assignResourceAction';

const AssignResource = () => {
    const [unversities, setUniversities] = useState([]);
    const [resources, setResources] = useState([]);
    const [assignedIds, setAssignedIds] = useState([]);

    //University id = uId
    const [uId, setUId] = useState(null);
    useEffect(() => {
        getUniversityNames()
            .then(response => {

                if (response.error) {
                    toast.error(response.message)
                } else {
                    setUniversities(response);

                }
            })
            .catch(error => {
                console.error('Error fetching getResources:', error);
                toast.error(error)

            });
    }, []);
    useEffect(() => {
        // Fetch all resources
        getResource()
            .then(response => {
                if (response.error) {
                    toast.error(response.message);
                } else {
                    // Update the resources with the status based on assigned IDs
                    const updatedResources = response.map(resource => ({
                        ...resource,
                        status: assignedIds.includes(resource._id) // Set status to true if ID is in assignedIds
                    }));
                    setResources(updatedResources);
                }
            })
            .catch(error => {
                console.error('Error fetching getResources:', error);
                toast.error(error.message || 'Failed to fetch resources');
            });
    }, [assignedIds]); // Depend on assignedIds to trigger when IDs change

    useEffect(() => {
        if (uId) {
            // Fetch the assigned details first
            getAssignedDetails(uId)
                .then(response => {
                    if (response.error) {
                        toast.error(response.message);
                    } else {
                        // Set the assigned IDs in state
                        setAssignedIds(response.map(resource => resource));
                    }
                })
                .catch(error => {
                    console.error('Error fetching getAssignedDetails:', error);
                    toast.error(error.message || 'Failed to fetch assigned details');
                });
        }
    }, [uId]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedResourceTypes = resources.filter(type => type.status).map(type => type._id);
        // alert(JSON.s)
        try {
            const data = { resources: selectedResourceTypes }
            const response = await updateResources(uId, data);

            if (response.error) {
                toast.error(response.message);

            } else {
                Router.push(`/resources/assign`);
                toast.success('Resource Assigned successfully!');


            }
            // Reset form or navigate away
        } catch (error) {
            toast.error('Failed to create resource');
            console.error('Error creating resource:', error);
        }
    }
    const onSelectChange = name => e => {

        setUId(e.target.value)

    }
    const handleRTypeChange = index => e => {
        const updatedtypes = resources.map((type, i) => {
            if (i === index) {
                return { ...type, status: e.target.checked };
            }
            return type;
        });

        setResources(updatedtypes);

    }
    return (
        <div >
            <ToastContainer autoClose={2000} position="top-center" />

            <MainScreen page="Assign Resource" children={
                <>
                    <div className="flex  justify-between items-center p-6">
                        <div className="flex gap-4 items-center">
                            <Link
                                href="/resources/assign" className=" no-underline hover:underline">
                                <div className="text-subheader text-primary cursor-pointer ">
                                    Assigned Resources
                                </div>
                            </Link>
                            <img src="/assets/icons/rightArrow.svg" alt="" height="15px" width="15px" />
                            <div className="text-subheader text-primary  cursor-pointer">Assign Resource</div>
                        </div>
                    </div>
                    <div className="p-6 top-5">
                        <div className="flex flex-col">
                            <div className="w-1/3">
                                <div className="mb-3">Universities</div>

                                <select id='single' className="custom-input w-full " onChange={onSelectChange("uId")} >
                                    <option value="">Select University</option>
                                    {unversities.map((person, i) =>
                                        <option key={i} value={person._id} > {person.name}</option>
                                    )}

                                </select>
                            </div>
                            {uId && <div className="my-3 w-1/3">
                                <div className="mb-3">Resources</div>
                                {resources.map((person, i) =>
                                    <div className="flex w-1/2 items-center my-3">
                                        <div className="me-3">

                                            <input type="checkbox"
                                                value={person.status}
                                                checked={person.status}
                                                className="peer w-[18px] h-[18px] cursor-pointer accent-checkboxChecked checked:bg-black"
                                                onChange={handleRTypeChange(i)} />
                                        </div>
                                        <div className="flex-1">

                                            <div className="">{person.name}</div>
                                        </div>

                                        <div className="task-box mt-3 mb-3"></div>

                                    </div>
                                )}
                            </div>}
                            {uId && <div className="my-3 w-1/3">
                                <button
                                    className="px-5 cursor-pointer border-0 bg-primary  text-[16px]    py-3   text-white rounded-md  "
                                    type="button"
                                    onClick={handleSubmit}
                                >Submit</button>
                            </div>}
                        </div>
                    </div>
                </>} />
        </div>
    )


}

export default AssignResource;
