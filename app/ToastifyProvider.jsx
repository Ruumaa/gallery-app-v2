'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
};

export default ToastProvider;
