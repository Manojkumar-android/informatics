// Toast state at a global level, managed outside of the page-level components, so that the toasts will persist across redirects
import { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContext = createContext();

export const useToasts = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }) => {
  const addToast = (message, type) => {
    const toastOptions = {
      autoClose: 5000,
      onClose: () => { },
    };
    toast[type](message, toastOptions);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <ToastContainer autoClose={1000} />
      {children}
    </ToastContext.Provider>
  );
};
