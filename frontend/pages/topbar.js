import React, { useContext, useEffect } from "react";
import NavigationContext from "../contexts/navigation";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";

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

    return (
        <div className="w-full   flex items-center justify-end  bg-white shadow-md p-2 h-[50px] z-10 ">
            <div className="flex flex-grow items-center ">
                <button
                    className="button-menu waves-effect waves-light mt-2"
                    onClick={(e) => handleToggleSidebar()}
                >
                    <FiMenu color="black" size="24px" />
                </button>
                {/* <div className="relative w-1/2">
                    <input type="email" className="search-input " placeholder="Search" />
                    <div className="absolute inset-y-0 right-10 flex items-center  pointer-events-none">
                        <Image
                            src="/assets/icons/ic_search.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div> */}
            </div>
            <div className="items-center justify-end pr-6">
                <Image
                    src="/assets/icons/ic_notification.svg"
                    width={20}
                    height={20}
                    alt=""
                />

            </div>
        </div>
    );
};

export default Topbar;
{/* <div className="relative inline-block text-left mx-2">
<div>
    <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
    >
        Options
        <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
            />
        </svg>
    </button>
</div>
<div
    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="menu-button"
    tabindex="-1"
>
    <div className="py-1" role="none">
        <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
        >
            Account settings
        </a>
        <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-item-1"
        >
            Support
        </a>
        <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
            id="menu-item-2"
        >
            License
        </a>
        <form method="POST" action="#" role="none">
            <button
                type="submit"
                className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
                role="menuitem"
                tabindex="-1"
                id="menu-item-3"
            >
                Sign out
            </button>
        </form>
    </div>
</div>
</div> */}