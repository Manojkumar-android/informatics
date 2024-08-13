import React, { useState, useEffect } from "react";
import Topbar from "./topbar";
import MainScreen from "./mainScreen";
import { getUniversities, createUniversities } from '../actions/admin/universitiesAction';
import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {
    const [universities, setUniversities] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLibraries = async () => {
            let allDocs = [];
            let currentPage = 1;
            let totalPages = 6;

            try {
                while (currentPage <= totalPages) {
                    const response = getUniversities(currentPage);
                    if (response.success) {
                        const universities = response.data.docs;
                        let newArray = []
                        for (let i = 0; i < universities.length; i++) {
                            const docs = universities[i]
                            const { _id, UniversityName, Email, MainLogo } = docs;
                            newArray.push({
                                name: UniversityName,
                                universityId: _id,
                                email: Email,
                                logo: MainLogo
                            })


                        }
                        allDocs = [...allDocs, ...newArray];
                        totalPages = response.data.totalPages;
                        console.log(response.data.totalPages)
                        currentPage++;
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                }
                setUniversities(allDocs);
            } catch (err) {
                setError(err.message);

            } finally {

                setLoading(false);
            }
        };

        fetchLibraries();
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            handleInstituteResponse();
        }
    }, [loading, error, universities]);

    const handleInstituteResponse = () => {
        if (universities.length > 0) {


            createUniversities(newArray)
                .then(response => {
                    if (response.error) {

                    } else {
                        toast.success("Universities data updated!")

                    }
                })
                .catch(error => {
                    console.error('Error storing unversities data:', error);
                    toast.error(error)

                });

        } else {
            console.error(response.error);
        }
    };
    return (
        <div >
            <ToastContainer autoClose={2000} position="top-center" />

            <MainScreen page="Dashboard" children={
                <div className="p-6">
                    <div className=" text-subheader text-primary  cursor-pointer">Dashboard</div>
                </div>
            } />


        </div>
    )

}

export default Dashboard;