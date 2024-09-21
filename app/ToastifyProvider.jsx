'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer theme="dark" autoClose={1000} draggable={false} />
    </>
  );
};

export default ToastProvider;
