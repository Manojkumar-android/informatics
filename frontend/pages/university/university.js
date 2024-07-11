import React, { useState, useEffect } from "react";
import MainScreen from "../mainScreen";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUniversities } from '../../actions/admin/universitiesAction';
import { ToastContainer, toast } from 'react-toastify';
import Paginator from "./paginator";

const Institutes = () => {
    const [institutes, setInstitutes] = useState({
        totalDocs: null,
        limit: null,
        totalPages: null,
        page: 1,
        hasPrevPage: null,
        hasNextPage: null,
        pagingCounter: null,
        prevPage: null,
        nextPage: null,
        to: null,
        docs: null,
    })
    const { pagingCounter, totalDocs, limit, totalPages, page, hasPrevPage, hasNextPage, prevPage, nextPage, docs, to } = institutes;
    useEffect(() => {
        loadData()
    }, [page]);
    const loadData = () => {
        getUniversities(page)
            .then(response => {
                handleInstituteResponse(response);
            })
            .catch(error => {
                console.error('Error fetching institutes:', error);
                toast.error(error)

            });

    };

    const handleInstituteResponse = (response) => {
        if (response.success) {
            const { limit, docs, totalDocs, page, hasPrevPage, hasNextPage, prevPage, nextPage, pagingCounter } = response.data;
            console.table(pagingCounter);
            console.table(limit);

            setInstitutes(prevState => ({
                ...prevState,
                docs,
                totalDocs,
                page,
                hasPrevPage,
                hasNextPage,
                pagingCounter,
                limit,
                to: docs.length,
                prevPage,
                nextPage
            }));
        } else {
            console.error(response.error);
        }
    };
    const logo = (row) => {

        return (
            <img src={row.MainLogo} alt="logo" width="50px" height="50px"></img>
        )
    }
    const contactNameTemplate = (rowData) => {
        return rowData.Organization?.CreatedBy?.UserName || 'N/A';
    };
    const onPageUpdate = (type) => {

        let newPage = page
        if (type == "next") {
            newPage = newPage + 1
        } else if (type == "prev") {
            newPage = newPage - 1
        }
        setInstitutes(prevState => ({
            ...prevState,
            page: newPage
        }));
    }
    return (
        <div >
            <ToastContainer autoClose={2000} position="top-center" />

            <MainScreen page="Universities" children={
                <>
                    <div className="flex  justify-between items-center p-6">
                        <div className="text-header font-semibold">Universities</div>
                        <Paginator
                            page={page}
                            hasNextPage={hasNextPage}
                            hasPrevPage={hasPrevPage}
                            pagingCounter={pagingCounter}
                            to={to}
                            onPageUpdate={onPageUpdate}
                            totalDocs={totalDocs} />

                    </div>

                    <div className="mx-5">
                        <DataTable
                            value={docs}
                            rows={10}
                            scrollable
                            // paginator
                            // paginatorPosition="top"
                            // pageLinkSize={limit}
                            // paginatorTemplate="PrevPageLink CurrentPageReport NextPageLink "
                            // currentPageReportTemplate={`${pagingCounter} to ${to} of ${totalDocs}`}
                            globalFilterFields={['name']}>
                            <Column body={logo} header="Logo"></Column>
                            <Column field="UniversityName" header="University Name"></Column>
                            <Column field="Address" header="Address"></Column>
                            <Column field="Email" header="Email"></Column>
                        </DataTable>
                    </div>
                </>

            } />


        </div>
    )

}

export default Institutes;