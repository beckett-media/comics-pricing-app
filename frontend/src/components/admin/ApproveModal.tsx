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
  user: { username: string; email: string; status: any }
  onClose: () => unknown
  onApprove: () => unknown
}

function ApproveModal({ isOpen, onClose, onApprove, user }: Props) {
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen) {
      setDone(false)
    }
  }, [isOpen]);

  const onConfirmClick = async () => {
    try {
      await onApprove()
      setDone(true)
    } catch (e) {
      console.error('Approv error', e);
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
            <ModalHeader textAlign={"center"}>APPROVE ACCESS</ModalHeader>
            <ModalBody textAlign={"center"}>
              Would you like to approve system access for <b>{user?.username}</b>?
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onConfirmClick}>
                Confirm Approval
              </Button>
            </ModalFooter>
          </ModalContent>
        ) : (
          <ModalContent background={"#212022"} top="50px">
            <ModalHeader textAlign={"center"}>CONFIRMED</ModalHeader>
            <ModalBody textAlign={"center"}>
              <b>{user?.username}</b> has been approved! They will appear here once they have set up their
              account.
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

export default ApproveModal
