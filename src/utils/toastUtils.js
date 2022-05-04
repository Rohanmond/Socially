import { toast } from 'react-toastify';

export const ToastHandler = (type, message) => {
  if (type === 'error') {
    toast.error(message, {
      position: 'bottom-right',
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'warn') {
    toast.warn(message, {
      position: 'bottom-right',
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'success') {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (type === 'info') {
    toast.info(message, {
      position: 'bottom-right',
      autoClose: 1500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};
export const ToastType = {
  Warn: 'warn',
  Success: 'success',
  Info: 'info',
  Error: 'error',
};
