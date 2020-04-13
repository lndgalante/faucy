import { useEffect } from 'react'
import { useToast as useChakraToast } from '@chakra-ui/core'

export function useToast() {
  const toast = useChakraToast()

  // Effect - Update toast styles
  useEffect(() => {
    const toastManager = document.querySelector('.Toaster__manager-top')
    if (toastManager) toastManager.style.maxWidth = '642px'
  }, [])

  const displayLoadingMessage = (message) => {
    return toast({
      status: 'info',
      position: 'top',
      duration: 7000,
      description: message,
    })
  }

  const displaySuccessMessage = (message) => {
    return toast({
      position: 'top',
      duration: 7000,
      status: 'success',
      description: message,
    })
  }

  const displayErrorMessage = (message) => {
    return toast({
      status: 'error',
      position: 'top',
      duration: 7000,
      description: message,
    })
  }

  return { displayLoadingMessage, displaySuccessMessage, displayErrorMessage }
}