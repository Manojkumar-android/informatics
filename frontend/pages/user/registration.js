import React, { useEffect, useState } from "react";
import Router from "next/router";
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Select from "react-select";

const Register = () => {

    const handleClick = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Successfully Registered to NextGrid!',
            text: '',
            icon: 'success',
            backdrop: `rgba(0,0,0,0.5)`,
            allowOutsideClick: false,
            confirmButtonText: 'Ok',
            showCancelButton: false,

        })
    };

    const categories = [
        { label: "Member", value: "Member" },
        { label: "Event", value: "Event" },
        { label: "College", value: "College" },
        { label: "Corporate", value: "Corporate" },
        { label: "Startup", value: "Startup" },
        { label: "Incubator", value: "Incubator" },
        { label: "Investor", value: "Investor" },
        { label: "Service Provider", value: "Service Provider" },
        { label: "Student", value: "Student" },
    ]

    const [cat, setCat] = useState([])

    const colleges = [
        { label: "Garden University", value: "Garden University" },
        { label: "PES", value: "PES" },
        { label: "National", value: "National" },

    ]

    const [coll, setColl] = useState([])
    const specialization = [
        { label: "DevOPs", value: "DevOPs" },
        { label: "IOS", value: "IOS" },
        { label: "Arhitecture", value: "Arhitecture" },
        { label: "Science", value: "Science" },
        { label: "Fintex", value: "Fintex" },
        { label: "AWS Service", value: "AWS Service" },

    ]

    const [spec, setSpecialization] = useState([])
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: '2px solid rgb(229, 231, 235)',  // Adjust border color and width
            borderRadius: '0.375rem', // Adjust border radius if needed
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'gray',
            //
        }),
    };
    const findBoolValueByLabel = () => {
        const foundCollegeOrStudent = cat.some(spec => spec.label === "College" || spec.label === "Student");
        return foundCollegeOrStudent
    }
    return (
        <div
            style={{
                background: "#FFFFFF",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <div className="flex justify-start items-center">
                <div className="hidden md:flex flex-col md:w-1/2 justify-center items-center bg-primary-opacity-20 min-h-screen">
                    <img src="/assets/icons/logo.png" height="50%" width="60%" alt="Logo" />

                </div>

                <div className="flex justify-center md:items-start items-center  h-screen  md:w-1/2 sm:w-full">
                    <div className="min-h-screen justify-center items-center mt-[5rem]   py-6 bg-white ">
                        <div className="md:hidden justify-center items-center sm:flex  px-5 ">
                            <img src="/assets/icons/logo.png" height="100px" width="60%" alt="Logo" />

                        </div>
                        <div className="text-start text-subheader mt-[1rem]  px-5">
                            Welcome to to NextGrids 👋 . Please register,
                        </div>
                        <form className=" mt-[2rem] md:w-[40rem] px-5 justify-center items-center text-sm font-normal text-dark" onSubmit={(e) => handleClick(e)} >

                            <div className="flex gap-10">
                                <div className="flex-col w-1/2">

                                    <div className="flex flex-col my-3 ">
                                        <label className="">Name</label>

                                        <input

                                            id="name"
                                            type="text"
                                            required
                                            className="custom-input mt-2 "
                                            placeholder="Enter your name"
                                        />

                                    </div>

                                    <div className="flex-col">

                                        <div className="flex flex-col my-3 ">
                                            <label >Email ID</label>

                                            <input
                                                required
                                                id="email"
                                                type="email"
                                                className="custom-input mt-2"
                                                placeholder="Enter your email Id"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-col">

                                        <div className="flex flex-col my-3 ">

                                            <label >Specialization </label>

                                            <Select
                                                value={spec}
                                                options={specialization}
                                                onChange={(e) => setSpecialization(e)}
                                                placeholder="Select Specialization"
                                                className='mt-2'
                                                required
                                                styles={customStyles}
                                            />
                                        </div>


                                    </div>
                                </div>
                                <div className="flex-col  w-1/2">

                                    <div className="flex flex-col my-3 ">
                                        <label >Mobile Number</label>

                                        <input
                                            required
                                            id="name"
                                            type="number"
                                            className="custom-input mt-2"
                                            placeholder="Enter your mobile number"
                                        />
                                    </div>

                                    <div className="flex-col">

                                        <div className="flex flex-col my-3 ">

                                            <label >Category </label>

                                            <Select
                                                value={cat}
                                                options={categories}
                                                placeholder="Select Category"
                                                onChange={(e) => setCat(e)}
                                                className='mt-2'
                                                required
                                                isMulti
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>
                                    {findBoolValueByLabel() && <div className="flex-col">

                                        <div className="flex flex-col my-3 ">

                                            <label >College </label>

                                            <Select
                                                value={coll}
                                                options={colleges}
                                                placeholder="Select College"
                                                onChange={(e) => setColl(e)}
                                                className='mt-2'
                                                required
                                                styles={customStyles}
                                            />
                                        </div>
                                    </div>}
                                    <div className="flex-col">

                                        <div className="flex flex-col my-3 ">
                                            <label >Description</label>

                                            <textarea
                                                className="custom-input custom-textarea mt-2"
                                                rows={5}
                                                required
                                                style={{ borderColor: 'rgb(229, 231, 235)', borderWidth: '2px' }}
                                                placeholder="Description"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className=" px-5 cursor-pointer border-0 bg-secondary text-base mt-6 py-3 text-white rounded-md"

                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div >



    );
};

export default Register;
