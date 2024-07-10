import React, { useContext } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FiGrid } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from 'next/link';
import Image from 'next/image';
import NavigationContext from "../contexts/navigation";

const Navigation = () => {
    const defaultText = 'text-black no-underline';
    const activeText = 'text-primary no-underline';
    const activeText1 = 'text-primary no-underline';
    const { collapsed } = useContext(NavigationContext);
    const router = useRouter();
    const defaultSubMenu = {
        color: 'black '
    };
    const activeSubMenu = {
        color: '#FF671F',
        alignItems: 'center',

    };
    // Function to determine if a menu item is active based on the current route
    const isMenuItemActive = (href) => router.pathname === href;
    const isSubMenuItemActive = (children) => {
        return children.some(child => router.pathname === child.href);
    };
    // Define menu items data
    const menuItems = [

        { href: "/dashboard", text: "Dashboard", activeIcon: "/assets/icons/sidebar/dashboard-active.svg", inActiveIcon: "/assets/icons/sidebar/dashboard-inactive.svg", children: [] },
        { href: "/institutes/institutes", text: "Institutes", activeIcon: "/assets/icons/sidebar/instituets-active.svg", inActiveIcon: "/assets/icons/sidebar/instituets-inactive.svg", children: [] },
        { href: "/events", text: "Resources", activeIcon: "/assets/icons/sidebar/resources-active.svg", inActiveIcon: "/assets/icons/sidebar/resources-inactive.svg", children: [] },
        { href: "/colleges", text: "Assign Resources", activeIcon: "/assets/icons/sidebar/assignResources-active.svg", inActiveIcon: "/assets/icons/sidebar/assignResources-inactive.svg", children: [] },
        { href: "/corporates", text: "FAQ’s", activeIcon: "/assets/icons/sidebar/faq-active.svg", inActiveIcon: "/assets/icons/sidebar/faq-inactive.svg", children: [] },

        {
            href: "/settings", text: "Settings", activeIcon: "/assets/icons/sidebar/settings-active.svg", inActiveIcon: "/assets/icons/sidebar/settings-inactive.svg",
            children: [


            ]
        },

        // Add more menu items as needed
    ];

    return (
        <div className="flex flex-col h-screen bg-white shadow-md">
            {!collapsed ? (
                <div className="flex text-center items-center justify-center bg-primary h-[50px] my-3 mx-5" >
                    <img src="/assets/icons/logo.png" height="30x" width="70%" alt="" />
                </div>
            ) : (
                <div className="flex justify-center my-3">
                    <img src="/assets/icons/newlogo.png" alt="" height="50px" width="50%" />
                </div>
            )}
            <div className="flex-grow overflow-y-auto">
                <Sidebar width="220px" collapsed={collapsed} className="pl-3 mt-3" >
                    <Menu menuItemStyles={{
                        button: ({ level, active }) => {
                            // Apply styles only on first level elements of the tree
                            if (level === 0) {
                                return {
                                    borderLeft: active ? '4px solid #3A0F6F' : '4px solid #ffffff',
                                    borderRadius: '5px 0px 0px 5px', // Rounded left corners for active items
                                    backgroundColor: active ? '#F3EDF9' : '#ffffff',

                                };
                            }
                        },

                    }}>


                        {menuItems.map((item, index) => (
                            // Check if the item has children
                            item.children && item.children.length > 0 ? (
                                <SubMenu
                                    key={index}
                                    label={item.text}
                                    rootStyles={isSubMenuItemActive(item.children) ? activeSubMenu : defaultSubMenu} // Apply custom styles here
                                    defaultOpen={isSubMenuItemActive(item.children)}
                                    active={isSubMenuItemActive(item.children)}
                                    icon={<Image
                                        src={isSubMenuItemActive(item.children) ? item.activeIcon : item.inActiveIcon}
                                        width={20} height={20} alt={item.text}
                                        className={isMenuItemActive(item.href) ? "active" : ""}
                                    />}
                                >
                                    {item.children.map((childItem, childIndex) => (
                                        <Link href={childItem.href} className={isMenuItemActive(childItem.href) ? activeText : defaultText} key={childIndex}>
                                            <MenuItem
                                                className={isMenuItemActive(childItem.href) ? "active ml-7" : "ml-7"}
                                                active={isMenuItemActive(childItem.href)}

                                            >
                                                {childItem.text}
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </SubMenu>
                            ) : (
                                // If the item does not have children, render a MenuItem
                                <Link href={item.href} key={index} className={isMenuItemActive(item.href) ? activeText : defaultText}>
                                    <MenuItem
                                        icon={<Image src={isMenuItemActive(item.href) ? item.activeIcon : item.inActiveIcon} width={20} height={20} alt={item.text} />}
                                        className={isMenuItemActive(item.href) ? "active" : ""}
                                        active={isMenuItemActive(item.href)}
                                    >
                                        {item.text}
                                    </MenuItem>
                                </Link>
                            )
                        ))}

                    </Menu>
                </Sidebar>
            </div>
        </div>
    );
};

export default Navigation;
