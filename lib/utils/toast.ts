import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const showSuccessToast = (message: string, title = 'Success') => {
  iziToast.success({
    title,
    message,
    position: 'topRight',
    timeout: 3000,
  });
};

export const showErrorToast = (message: string, title = 'Error') => {
  iziToast.error({
    title,
    message,
    position: 'topRight',
    timeout: 5000,
  });
};
