import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

function CustomModal({
  isOpen,
  onClose,
  fns,
  title,
  msg,
  cancelBtn,
  onCancel,
}) {
  return (
    <>
      <Modal isOpen={isOpen} size="sm" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalBody>{msg}</ModalBody>
          <ModalFooter>
            {cancelBtn && (
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => onCancel()}
                fontWeight="normal"
              >
                Cancel
              </Button>
            )}
            <Button
              colorScheme="green"
              variant="solid"
              onClick={() => onClose()}
              fontWeight="normal"
            >
              Okay
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CustomModal;
