import { useState, useContext, useEffect } from 'react';

import UserContext from '../contexts/userContext';

const ResetPopup = ({ isOpen, onClose }) => {

    const { username,
        setUsername,
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        handleLogin,
        email, setEmail,
        handleResetPassword } = useContext(UserContext);
    if (!isOpen) return null;
    const handleBackdropClick = (e) => {
        // Close the modal when the backdrop is clicked
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleBackdropClick}>
            <div className="bg-white py-8 rounded-3xl shadow-lg w-1/3 flex flex-col items-center ">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="Logo" className="h-[48px] w-[200]" />
                </div>

                <form className="w-full px-14 justify-center items-center" role='form' onSubmit={handleResetPassword}>
                    <div className="mb- ">
                        <h1 className='font-semibold text-2xl'>Reset Password</h1>

                        <label htmlFor="username" className="block text-sm font-medium text-gray-500 mb-3">Username</label>
                        <input
                            type="text"
                            className="custom-input w-full"
                            placeholder="Enter your username"
                            value={username}
                            required
                            onChange={(e) => { setUsername(e.target.value) }}
                        />                              </div>
                    <div className="mb-3 ">
                        <br />
                        <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-3">Old Password</label>
                        <input
                            type="password"
                            className="custom-input w-full"
                            placeholder="Enter your old password"
                            required
                            value={oldPassword}
                            onChange={(e) => { setOldPassword(e.target.value) }}
                        />                        </div>
                    <div className="mb-3 ">
                        <br />
                        <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-3">New Password</label>
                        <input
                            type="password"
                            className="custom-input w-full"
                            placeholder="Enter your new password"
                            required
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />                        </div>

                    <button
                        className="w-full cursor-pointer border-0 bg-secondary  text-[16px]   mt-6  py-3   text-white rounded-md  "
                        type="submit"
                    >

                        <span>Reset Password</span>
                    </button>
                </form>


            </div>
        </div>
    );
};

export default ResetPopup;