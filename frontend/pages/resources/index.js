import React, { useState, useEffect } from "react";
import MainScreen from "../mainScreen";
import Link from "next/link";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ToastContainer, toast } from 'react-toastify';
import { getResource, createResource } from '../../actions/admin/resouceAction';
import { isAuth } from '../../actions/admin/universitiesAction';

import { Button } from 'primereact/button';
import { FiEdit } from "react-icons/fi";
import Router from 'next/router';

const Resources = () => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        loadData()
    }, []);
    const loadData = () => {
        getResource()
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
    const searchApiLinkTemplate = (rowData) => {
        return (
            <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', width: '200px' }}>
                {rowData.searchApiLink}
            </div>
        );
    };

    const browseApiLinkTemplate = (rowData) => {
        return (
            <div style={{ wordWrap: 'break-word', whiteSpace: 'normal', width: '200px' }}>
                {rowData.browseApiLink}
            </div>
        );
    };
    const editResource = (rowData) => {
        return (
            <Link legacyBehavior href={{
                pathname: '/resources/editResource',
                query: { id: rowData._id },
            }}><a>     <i className="mx-2"  ><FiEdit size='18px' color='#00C5B2' /></i></a></Link>
        )
    };
    const logoBodyTemplate = (rowData) => {
        return <img src={rowData.logo} alt={rowData.name} style={{ width: '50px', height: '50px' }} />;
    };
    return (
        <div >
            <ToastContainer autoClose={2000} position="top-center" />

            <MainScreen page="Resources" children={
                <>
                    <div className="flex  justify-between items-center p-6">
                        <div className="text-subheader text-primary  cursor-pointer">Resources</div>
                        <Link href="/resources/addResource"><Button className="bg-primary active:border-l-purple-stroke  border-0 p-d-flex p-ai-center">
                            <img src="/assets/icons/add.svg" alt="" className="me-3" height="15px" width="15px" />
                            Add Resource
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
                            <Column field="searchApiLink" body={searchApiLinkTemplate} header="Source API Link" ></Column>
                            <Column field="browseApiLink" body={browseApiLinkTemplate} header="Browse API Link"  ></Column>
                            <Column body={editResource} header="Action"></Column>

                        </DataTable>
                    </div>
                </>} />
        </div>
    )
}
export default Resources;
