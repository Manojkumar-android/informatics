import React, { useState, useContext, useEffect, useRef } from 'react';
import Link from 'next/link';
import LoginPopup from './login';
import ResetPopup from './resetPassword';
import UserContext from '../contexts/userContext';
import Router, { useRouter } from 'next/router';
import { Menu } from 'primereact/menu';

const TopBarWithoutLogout = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const menuLeft = useRef(null);
  const { isLoginPopupOpen, setIsResetPopupOpen, isResetPopupOpen, handleLoginClick, closeResetPopup, closeLoginPopup, userSession, setUserSession, userName } = useContext(UserContext);

  const [showBellPopup, setShowBellPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const handleLogout = (event) => {

    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUserSession(null)
    // For example, clearing user session and redirecting to login page
  };

  const handleResetPass = (event) => {
    setIsResetPopupOpen(true)
    // For example, clearing user session and redirecting to login page
  };
  const items = [

    {
      label: `Hi ${userName}`,
      icon: 'pi pi-search',
      items: [
        {
          label: 'Reset Password',
          icon: 'pi pi-bolt',
          command: handleResetPass
        },
        {
          label: 'Logout',
          icon: 'pi pi-bolt',
          command: handleLogout
        },


      ]
    },

  ];

  const links = [
    { href: '/e-resources', label: 'E-resources' },
    { href: '/', label: 'Search' },
    { href: '/browse', label: 'Browse' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ];


  return (
    <div className="relative bg-white text-black flex justify-between h-[100px] items-center p-4">
      {/* Left Logo */}
      <div className="flex items-center">
        <img src="/college logo.png" alt="Logo" className="h-[50px] w-[193.42px] mr-2" />
      </div>

      {/* Middle Links */}
      <div className="flex space-x-5 justify-center">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-black no-underline hover:text-primary hover:underline ${currentPath === link.href ? 'font-bold  underline' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {userSession ?
        <div className="flex items-center relative">
          {/* <img src="/bell logo.png" alt="Bell Logo" className="h-[36px] w-[36px] ml-5 cursor-pointer" onClick={toggleBellPopup} /> */}

          <img src="/profile logo.png" alt="Profile Logo" className='h-[36px] w-[36px] right-[20px] mr-5 cursor-pointer' onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
          <img src="/logo.png" alt="Info Logo" className="h-[48px] w-[200] ml-4" />


          <Menu model={items} popup ref={menuLeft} id="popup_menu_left" className='mt-3' />
          <ResetPopup isOpen={isResetPopupOpen} onClose={closeResetPopup} />

          {/* {showProfilePopup && (
            <div className="absolute right-0 mt-12 w-64 bg-white p-4 shadow-lg rounded-lg">
              <div className="flex justify-between items-center">
                <span>Profile Info</span>
                <button onClick={toggleProfilePopup} className="text-red-500">Close</button>
              </div>
              <p>Here is your profile information.</p>
            </div>
          )} */}
        </div>
        :
        <div>
          <LoginPopup isOpen={isLoginPopupOpen} onClose={closeLoginPopup} />

          <div className="flex items-center cursor-pointer gap-2 " onClick={handleLoginClick}>
            <div
              className=" text-[#EF4444] font-bold py-2 px-2 rounded cursor-pointer"

            >
              <span>Login</span>
            </div>
            <img
              src="/logout.png"
              width={20}
              height={20}
              alt="Logout"
            />
            <img src="/logo.png" alt="Info Logo" className="h-[48px] w-[200] ml-4" />
          </div>
        </div>}




    </div >
  );
};

export default TopBarWithoutLogout;
