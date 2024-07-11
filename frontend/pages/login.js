import React from "react";
import Router from "next/router";
import { useState, useEffect } from 'react';
import LoadingSpinner from "./shared/loading";
import { login, authenticate } from "../actions/admin/adminAction";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();
        const body = { username, password, rememberMe }
        console.log(body)
        login(body).then(data => {
            if (data.error) {
                toast.error(data.message)

            } else {

                authenticate(data, () => {
                    Router.push(`/dashboard`);
                });

            }
        });


    }
    return (
        <div
            style={{
                backgroundImage: 'url("/assets/icons/background.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100vw",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <ToastContainer autoClose={2000} position="top-center" />

            <div className="flex  items-center justify-center md:mr-[rem] min-h-screen space-x-10 ">
                {/* <div className="relative flex  m-6 space-x-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0"> */}

                <form role="form" onSubmit={onSubmit}  >

                    <div className="bg-white shadow-2xl rounded-2xl w-[500px] md:w-[450px]   p-12 md:px-16 ">
                        <div className="flex text-center items-center justify-center bg-primary h-[50px] mx-5" >
                            <img src="/assets/icons/logo.png" height="35x" width="70%" alt="" />
                        </div>
                        <div className="flex items-start justify-start my-5 text-[24px] font-bold">
                            Admin Login
                        </div>
                        <div className="text-sm font-normal text-dark  my-3 ">
                            {" "}
                            Username
                        </div>
                        <input
                            type="text"
                            className="custom-input w-full"
                            placeholder="Enter your username"
                            value={username}
                            required
                            onChange={(e) => { setUsername(e.target.value) }}
                        />

                        <div className="text-sm font-normal  mt-5 mb-3 "> Password</div>
                        <input
                            type="password"
                            className="custom-input w-full"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        {/* <div className="flex items-end justify-end mt-2">
                        <div className="text-info">Forgot password?</div>
                    </div> */}
                        <div className="flex my-2">

                            <input type="checkbox" className="h-[18px] w-[18px] checked:bg-primary" onChange={(e) => { setRememberMe(e.target.checked) }} />
                            <div className="text font-size-14 mt-0.5 mx-1">Remember me</div>

                        </div>
                        <button
                            className="w-full cursor-pointer border-0 bg-primary  text-[16px]   mt-6  py-3   text-white rounded-md  "
                            type="submit"
                        >

                            <span>Login</span>
                        </button>
                    </div>
                </form>
                {/* </div> */}

            </div>
        </div>
    );
};

export default Login;
