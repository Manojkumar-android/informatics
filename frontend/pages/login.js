import React from "react";
import Router from "next/router";

const Login = () => {
    const handleClick = () => {
        Router.push(`/dashboard`);
    };

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
            <div className="flex  items-center justify-center md:mr-[10rem] min-h-screen space-x-10 ">
                {/* <div className="relative flex  m-6 space-x-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0"> */}


                <div className="bg-white shadow-2xl rounded-2xl w-[350px] md:w-[300px]   p-12 md:px-16 ">
                    <div className="flex text-center items-center justify-center bg-primary h-[50px] mx-5" >
                        <img src="/assets/icons/logo.png" height="35x" width="70%" alt="" />
                    </div>
                    <div className="flex items-start justify-start my-5 text-[24px] font-bold">
                        Admin Login
                    </div>
                    <div className="text-sm font-normal text-dark  my-3 ">
                        {" "}
                        Email ID
                    </div>
                    <input
                        type="email"
                        className="custom-input w-full"
                        placeholder="Enter your email Id"
                    />

                    <div className="text-sm font-normal  mt-5 mb-3 "> Password</div>
                    <input
                        type="password"
                        className="custom-input w-full"
                        placeholder="Enter your password"
                    />

                    <div className="flex items-end justify-end mt-2">
                        <div className="text-info">Forgot password?</div>
                    </div>

                    <button
                        className="w-full cursor-pointer border-0 bg-primary  text-[16px]   mt-6  py-3   text-white rounded-md  "
                        onClick={handleClick}
                    >

                        <span>Login</span>
                    </button>
                </div>
                {/* </div> */}

            </div>
        </div>
    );
};

export default Login;
