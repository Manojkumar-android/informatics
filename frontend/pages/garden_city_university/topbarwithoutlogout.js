import React, { useState } from 'react';
import Link from 'next/link';

const TopBarWithoutLogout = () => {
  const [showBellPopup, setShowBellPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const toggleBellPopup = () => setShowBellPopup(!showBellPopup);
  const toggleProfilePopup = () => setShowProfilePopup(!showProfilePopup);

  return (
    <div className="relative bg-white text-black flex justify-between h-[100px] items-center p-4">
      {/* Left Logo */}
      <div className="flex items-center">
        <img src="/college logo.png" alt="Logo" className="h-[50px] w-[193.42px] mr-2" />
      </div>

      {/* Middle Links */}
      <div className="flex space-x-5 justify-center">
        <Link href="/e-resources" className="hover:text-gray-400">
          E-resources
        </Link>
        <Link href="/search" className="hover:text-gray-400">
          Search
        </Link>
        <Link href="/browse" className="hover:text-gray-400">
          Browse
        </Link>
        <Link href="/about" className="hover:text-gray-400">
          About
        </Link>
        <Link href="/contact" className="hover:text-gray-400">
          Contact
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center relative">
        <img src="/bell logo.png" alt="Bell Logo" className="h-[36px] w-[36px] ml-5 cursor-pointer" onClick={toggleBellPopup} />
        <img src="/profile logo.png" alt="Profile Logo" className='h-[36px] w-[36px] ml-5 cursor-pointer' onClick={toggleProfilePopup} />
        <img src="/info logo.png" alt="Info Logo" className="h-[48px] w-[190.35px] ml-10" />

        {showBellPopup && (
          <div className="absolute right-0 mt-12 w-64 bg-white p-4 shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <span>Bell Notifications</span>
              <button onClick={toggleBellPopup} className="text-red-500">Close</button>
            </div>
            <p>Here are your notifications.</p>
          </div>
        )}

        {showProfilePopup && (
          <div className="absolute right-0 mt-12 w-64 bg-white p-4 shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <span>Profile Info</span>
              <button onClick={toggleProfilePopup} className="text-red-500">Close</button>
            </div>
            <p>Here is your profile information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBarWithoutLogout;
