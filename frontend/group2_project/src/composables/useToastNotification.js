import { useToast } from 'vue-toast-notification';

export function useToastNotification() {
  const toast = useToast();

  const showSuccess = (message, options = {}) => {
    return toast.success(message, {
      position: 'top-right',
      duration: 3000,
      ...options
    });
  };

  const showError = (message, options = {}) => {
    return toast.error(message, {
      position: 'top-right',
      duration: 5000,
      ...options
    });
  };

  const showWarning = (message, options = {}) => {
    return toast.warning(message, {
      position: 'top-right',
      duration: 4000,
      ...options
    });
  };

  const showInfo = (message, options = {}) => {
    return toast.info(message, {
      position: 'top-right',
      duration: 3000,
      ...options
    });
  };

  const clearAll = () => {
    toast.clear();
  };

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAll
  };
}