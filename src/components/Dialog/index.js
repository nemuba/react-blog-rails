import React, {useState, useRef} from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/core";
import { FaTrash } from 'react-icons/fa';
// import { Container } from './styles';

function Dialog({handleDelete, id}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClose = () => {
    handleDelete(id);
    onClose();
  }
  return (
    <>
      <Button onClick={onOpen} variant="outline" mx={2}>
        <FaTrash fill="red" size={12}/>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Excluir Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Tem Certeza ?</Text>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" colorScheme="red.600" mr={3} onClick={handleClose}>
                Ok
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancelar</Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </>
  )
}

export default Dialog;