import { useState, useContext, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import UserContext from '../contexts/userContext';
const LoginPopup = ({ isOpen, onClose }) => {
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const { username, setUsername, password, setPassword, handleLogin, email, setEmail, handleForgotPassword } = useContext(UserContext);

    if (!isOpen) return null;

    const handleForgotPasswordClick = () => {
        setIsForgotPassword(true);
    };

    const handleBackToLoginClick = () => {
        setIsForgotPassword(false);
    };
    const handleBackdropClick = (e) => {
        // Close the modal when the backdrop is clicked
        if (e.target === e.currentTarget) {
            setIsForgotPassword(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleBackdropClick}>
            <div className="bg-white py-8 rounded-3xl shadow-lg w-1/3 flex flex-col items-center ">
                <div className="flex justify-center mb-4">
                    <img src="/logo.png" alt="Logo" className="h-[48px] w-[200]" />
                </div>
                {!isForgotPassword ? (
                    <form className="w-full px-14 justify-center items-center" role='form' onSubmit={handleLogin}>
                        <div className="mb- ">
                            <h1 className='font-semibold text-2xl'>Login</h1>

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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-3">Password</label>
                            <input
                                type="password"
                                className="custom-input w-full"
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />                        </div>
                        <div className="flex items-center justify-end  mb-4">
                            <a href="#" className="text-sm text-[#FB070B] no-underline hover:underline" onClick={handleForgotPasswordClick}>Forgot Password?</a>
                        </div>

                        <button
                            className="w-full cursor-pointer border-0 bg-secondary  text-[16px]   mt-6  py-3   text-white rounded-md  "
                            type="submit"
                        >

                            <span>Login</span>
                        </button>
                    </form>
                ) : (
                    <form className="w-full px-14 justify-center items-center" role='form' onSubmit={handleForgotPassword}>
                        <h1 className='font-semibold text-2xl'>Forgot Password</h1>

                        <div className="mb-4 ">

                            <label htmlFor="username" className="block text-sm font-medium text-gray-500 mb-3">Username</label>
                            <input
                                type="text"
                                className="custom-input w-full"
                                placeholder="Enter your username"
                                value={username}
                                required
                                onChange={(e) => { setUsername(e.target.value) }}
                            />                              </div>
                        <div className="mb-4 ">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-3">Email ID</label>
                            <input
                                type="email"
                                className="custom-input w-full"
                                placeholder="Enter your email"
                                value={email}
                                required
                                onChange={(e) => { setEmail(e.target.value) }}
                            />                        </div>
                        <div className='text-low '>An email will be sent to this address with a further instructions.</div>
                        <button
                            className="w-full cursor-pointer border-0 bg-secondary  text-[16px]   mt-6  py-3   text-white rounded-md  "
                            type="submit"
                        >

                            <span>Reset Password</span>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default LoginPopup;