import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type RootState } from '@/store';
import { clearNotification } from '@/store/notificationSlice';

const NotificationHandler: React.FC = () => {
  const dispatch = useDispatch();
  const currentNotification = useSelector((state: RootState) => state.notification.current);

  useEffect(() => {
    if (currentNotification) {
      const { message, type } = currentNotification;
      
      toast[type](message, {
        onClose: () => dispatch(clearNotification())
      });
    }
  }, [currentNotification, dispatch]);

  return (
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default NotificationHandler;
