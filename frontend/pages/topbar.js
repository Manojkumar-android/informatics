import React, { useContext, useEffect } from "react";
import NavigationContext from "../contexts/navigation";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Router from "next/router";

const Topbar = () => {
    const { setCollapsed, collapsed } = useContext(NavigationContext);
    const handleToggleSidebar = () => {
        if (window.innerWidth >= 768) {
            // Only toggle sidebar if the screen size is md or larger
            setCollapsed(!collapsed);
        }
    };
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                // 768px is the width for md breakpoint in Tailwind CSS

                setCollapsed(true); // Ensure that the sidebar is  collapsed for smaller screens
            } else if (window.innerWidth >= 768) {
                setCollapsed(false); // Ensure that the sidebar is not  collapsed for md or larger screens
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty dependency array ensures that the effect runs only once when the component mounts
    const handleLogout = (event) => {

        localStorage.removeItem("token")
        Router.push(`/`);

        // For example, clearing user session and redirecting to login page
    };
    return (
        <div className="w-full   flex items-center justify-end  bg-white shadow-md p-2 h-[50px] z-10 ">
            <div className="flex flex-grow items-center ">
                <button
                    className="button-menu waves-effect waves-light mt-2"
                    onClick={(e) => handleToggleSidebar()}
                >
                    <FiMenu color="black" size="24px" />
                </button>

            </div>

            <div className="flex items-center cursor-pointer px-3" onClick={handleLogout}>
                <div
                    className=" text-darkfont-bold py-2 px-2 rounded cursor-pointer"

                >
                    <span>Logout</span>
                </div>
                <img
                    src="/assets/icons/logout.png"
                    width={20}
                    height={20}
                    alt="Logout"
                />
            </div>
        </div>
    );
};

export default Topbar;
