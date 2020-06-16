import React from 'react';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';

export function Modal({ isOpen, handleClose, title, body, footer }) {
  return (
    <>
      <ChakraModal isCentered isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />

          <ModalBody>{body}</ModalBody>

          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  );
}
