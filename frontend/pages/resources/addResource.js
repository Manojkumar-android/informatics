import React, { useState, useEffect } from "react";
import MainScreen from "../mainScreen";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToastContainer, toast } from 'react-toastify';
import { getResource, createResource, getResourceType } from '../../actions/admin/resouceAction';
import Link from "next/link";
import { FileUpload } from 'primereact/fileupload';
import Router from "next/router";


const AddResource = () => {
    const [resource, addResource] = useState({
        logo: null,
        name: "",
        searchApiLink: "",
        publisherWebsite: "",
        searchHeaderParam: "",
        searchHeaderValue: "",
        browseApiLink: "",
        description: "",
        resourceTypes: [],

    })
    const { publisherWebsite, searchHeaderParam, searchHeaderValue, logo, name, searchApiLink, browseApiLink, description, resourceTypes } = resource;
    const [logoPath, setLogoPath] = useState("/assets/icons/no-logo-2.png")
    const resourceTypeOptions = [{}]
    // rTypes = Resource types
    const [rTypes, setRTypes] = useState([]);

    useEffect(() => {
        loadData()
    }, []);
    const loadData = () => {
        getResourceType()
            .then(response => {
                if (response && response.data) {
                    const newArray = response.data.map(item => ({
                        _id: item._id,
                        name: item.Name,
                        displayName: item.DisplayName,
                        status: false
                    }));
                    setRTypes(newArray);
                }
            })
            .catch(error => {
                console.error('Error fetching getResources:', error);
                toast.error(error.message || 'Failed to load resource types');
            });
    };
    const onFileChange = (e) => {

        addResource(prevState => ({
            ...prevState,
            logo: e.target.files[0]
        }));
        setLogoPath(URL.createObjectURL(e.target.files[0]));

    }

    const onTextChange = name => e => {

        addResource(prevState => ({
            ...prevState,
            [name]: e.target.value
        }));

    }

    const handleRTypeChange = index => e => {
        const updatedtypes = rTypes.map((type, i) => {
            if (i === index) {
                return { ...type, status: e.target.checked };
            }
            return type;
        });

        setRTypes(updatedtypes);

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo', resource.logo);
        formData.append('name', resource.name);
        formData.append('searchApiLink', resource.searchApiLink);
        formData.append('publisherWebsite', resource.publisherWebsite);
        formData.append('browseApiLink', resource.browseApiLink);
        formData.append('searchHeaderParam', searchHeaderParam);
        formData.append('searchHeaderValue', searchHeaderValue);
        formData.append('description', resource.description);

        // Convert resourceTypes to an array of IDs
        const selectedResourceTypes = rTypes.filter(type => type.status).map(type => type._id);
        formData.append('resourcesTypes', JSON.stringify(selectedResourceTypes)); // Ensure it's a JSON string


        try {
            const response = await createResource(formData);

            if (response.error) {
                toast.error(response.message);

            } else {
                Router.push(`/resources`);
                toast.success('Resource created successfully');


            }
            // Reset form or navigate away
        } catch (error) {
            toast.error('Failed to create resource');
            console.error('Error creating resource:', error);
        }
    };
    return (
        <div >
            <ToastContainer autoClose={2000} position="top-center" />

            <MainScreen page="Add Resource" children={
                <>
                    <div className="flex  justify-between items-center p-6">
                        <div className="flex gap-4 items-center">
                            <Link
                                href="/resources/resources" className=" no-underline hover:underline">
                                <div className="text-subheader text-primary cursor-pointer ">
                                    Resources
                                </div>
                            </Link>
                            <img src="/assets/icons/rightArrow.svg" alt="" height="15px" width="15px" />
                            <div className="text-subheader text-primary  cursor-pointer">Add Resource</div>
                        </div>
                    </div>
                    <div className="p-6 top-5">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col">


                                <div className="flex my-3 gap-5" >
                                    <div className="w-1/3" >
                                        <img src={logoPath} alt=""
                                            className="" height="150px" width="150px" />
                                        <input type="file" onChange={onFileChange} className="m-3" />

                                    </div>
                                    <div className="w-1/3">
                                        <div className="mb-3">Description</div>
                                        <textarea
                                            rows={5}
                                            value={description}
                                            className="custom-input w-full"
                                            placeholder="Enter description"
                                            onChange={onTextChange("description")}
                                        />
                                        <div className="my-3">Resource Name</div>
                                        <input type="text"
                                            value={name}
                                            required
                                            className="custom-input w-full "
                                            placeholder="Enter resource name"
                                            onChange={onTextChange("name")}
                                        />

                                    </div>
                                </div>

                                <div className="flex my-3 gap-5" >
                                    <div className="w-1/3" >
                                        <div className="mb-3">Browse Api Link</div>
                                        <input type="text"
                                            value={browseApiLink}
                                            className="custom-input w-full "
                                            placeholder="Enter browse api link"
                                            onChange={onTextChange("browseApiLink")}
                                        />
                                    </div>
                                    <div className="w-1/3">
                                        <div className="mb-3">Publisher Website</div>
                                        <input type="text"
                                            value={publisherWebsite}
                                            className="custom-input w-full"
                                            placeholder="Enter publisher website"
                                            onChange={onTextChange("publisherWebsite")}
                                        />
                                    </div>
                                </div>
                                <div className="flex my-3 gap-5" >
                                    <div className="w-1/3" >
                                        <div className="mb-3">Search Api link</div>
                                        <input type="text"
                                            value={searchApiLink}
                                            className="custom-input w-full"
                                            placeholder="Enter search api link"
                                            onChange={onTextChange("searchApiLink")}
                                        />

                                    </div>
                                    <div className="w-1/2" >
                                        <div className="mb-3">Search Header</div>
                                        <div className="flex gap-3" >
                                            <input type="text"
                                                value={searchHeaderParam}
                                                className="custom-input w-full"
                                                placeholder="Enter Param"
                                                onChange={onTextChange("searchHeaderParam")}
                                            />
                                            <input type="text"
                                                value={searchHeaderValue}
                                                className="custom-input w-full"
                                                placeholder="Enter Key-Value"
                                                onChange={onTextChange("searchHeaderValue")}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex my-3 gap-5" >
                                    <div className="w-1/3" >
                                        <div className="mb-3">Resource Types</div>
                                        {rTypes.map((person, i) =>
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
                                    </div>
                                </div>


                            </div>
                            <button
                                className="px-5 cursor-pointer border-0 bg-primary  text-[16px]    py-3   text-white rounded-md  "
                                type="submit"
                            >Submit</button>
                        </form>

                    </div>
                </>} />
        </div>
    )

}

export default AddResource;
