import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react"
import React from "react"

interface Props {
  isOpen: boolean
  user: any | null
  onClose: () => unknown
  onRemove: () => unknown
}

function RemoveModal({ isOpen, onClose, onRemove, user }: Props) {
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen) {
      setDone(false)
    }
  }, [isOpen]);

  const onConfirmClick = async () => {
    try {
      await onRemove()
      setDone(true)
    } catch (e) {
      console.error('Remove error', e);
    }
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {!done ? (
          <ModalContent background={"#212022"} top="50px">
            <ModalHeader textAlign={"center"}>REMOVE USER</ModalHeader>
            <ModalBody textAlign={"center"}>
              Are you sure you want to remove <b>{user.username}</b>?
              <br />
              This will revoke their access to the system and cannot be undone.
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onConfirmClick}>
                Remove
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent background={"#212022"} top="50px">
            <ModalHeader textAlign={"center"}>CONFIRMED</ModalHeader>
            <ModalBody textAlign={"center"}>
              <b>{user.username}</b>{`'s account has been deleted`}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

export default RemoveModal
