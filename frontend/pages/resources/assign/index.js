import React, { useState, useEffect } from "react";
import MainScreen from "../../mainScreen";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToastContainer, toast } from 'react-toastify';
import { getAssignedUniversity, getUniversityNames } from '../../../actions/admin/assignResourceAction';
import Link from "next/link";
import Router from "next/router";
import { Button } from 'primereact/button';


const AssignResource = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        loadData()
    }, []);
    const loadData = () => {
        getAssignedUniversity()
            .then(response => {

                if (response.error) {
                    toast.error(response.message)
                } else {
                    setResources(response);

                }
            })
            .catch(error => {
                console.error('Error fetching getResources:', error);
                toast.error(error)

            });

    };


    const logoBodyTemplate = (rowData) => {
        return <img src={rowData.logo} alt={rowData.name} style={{ width: '50px', height: '50px' }} />;
    };
    return (
        <div >
            <ToastContainer autoClose={2000} position="top-center" />

            <MainScreen page="Assigned Resources" children={
                <>
                    <div className="flex  justify-between items-center p-6">
                        <div className="text-subheader text-primary  cursor-pointer">Assigned Resources</div>
                        <Link href="/resources/assign/assignResource"><Button className="bg-primary active:border-l-purple-stroke  border-0 p-d-flex p-ai-center">
                            <img src="/assets/icons/add.svg" alt="" className="me-3" height="15px" width="15px" />
                            Assign Resource
                        </Button></Link>
                    </div>
                    <div className="mx-5">
                        <DataTable
                            value={resources}
                            rows={10}
                            scrollable

                            globalFilterFields={['name', 'searchApiLink', 'browseApiLink', 'description']}
                        >
                            <Column body={logoBodyTemplate} header="Logo"></Column>
                            <Column field="name" header="Name"></Column>
                            <Column field="resourceTypesString" header="Resources" ></Column>
                        </DataTable>
                    </div>
                </>} />
        </div>
    )
}

export default AssignResource;