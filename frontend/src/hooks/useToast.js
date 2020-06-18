import { useEffect } from 'react';
import { useToast as useChakraToast } from '@chakra-ui/core';

export function useToast() {
  const toast = useChakraToast();

  // Effect - Update toast styles
  useEffect(() => {
    const toastManager = document.querySelector('.Toaster__manager-top');
    if (toastManager) Object.assign(toastManager.style, { maxWidth: '606px' });
  }, []);

  const displayInfoMessage = (message) => {
    return toast({
      status: 'info',
      position: 'top',
      duration: 4000,
      description: message,
    });
  };

  const displaySuccessMessage = (message) => {
    return toast({
      position: 'top',
      duration: 8000,
      status: 'success',
      description: message,
    });
  };

  const displayErrorMessage = (message) => {
    return toast({
      status: 'error',
      position: 'top',
      duration: 8000,
      description: message,
    });
  };

  return { displayInfoMessage, displaySuccessMessage, displayErrorMessage };
}
