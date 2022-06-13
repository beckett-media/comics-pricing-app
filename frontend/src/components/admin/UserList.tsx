import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react";
import { DataStore } from '@aws-amplify/datastore';
import { ComicWaitingList, ComicWaitingListStatus } from "../../models";
import { APPROVED_ACCOUNTS, User, WAITLIST_REQUESTS } from "./data"
import ApproveModal from "./ApproveModal";
import RemoveModal from "./RemoveModal";

export default function UserList() {
  const { isOpen: isApproveOpen, onOpen: openApprove, onClose: closeApprove } = useDisclosure();
  const { isOpen: isRemoveOpen, onOpen: openRemove, onClose: closeRemove } = useDisclosure();
  const [userA, setUserA] = React.useState<User | null>(null);
  const [userR, setUserR] = React.useState<User | null>(null);

  const onApproveAccessHandler = async (user: User) => {
    await DataStore.save(
        new ComicWaitingList({
        "name": user.username,
        "email": user.email,
        "status": ComicWaitingListStatus.PENDING
      })
    );

    setUserA(user);
    openApprove();
  }

  const approveUser = () => {
    // approve user
    return true;
  }

  const onRemoveAccountHandler = (user: User) => {
    setUserR(user);
    openRemove();
  }

  const removeUser = () => {
    // remove user
    return true;
  }

  React.useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(ComicWaitingList);

      console.log('waitinglist users', models);
    };

    func();
  }, []);

  return (
    <Box>
      <Heading fontSize={20} fontWeight={500}>
        Manage Users
      </Heading>
      <ApproveModal user={userA} isOpen={isApproveOpen} onClose={closeApprove} onApprove={approveUser} />
      <RemoveModal user={userR} isOpen={isRemoveOpen} onClose={closeRemove} onRemove={removeUser} />
      <Box mt={"40px"}>
        <Heading fontSize={16} fontWeight={500} mb={"16px"}>
          Waitlist Requests
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color={"white"}>User name</Th>
                <Th color={"white"}>Email</Th>
                <Th isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {WAITLIST_REQUESTS.map((user) => (
                <Tr key={user.email}>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td isNumeric>
                    <button onClick={() => onApproveAccessHandler(user)}>Approve access</button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box mt={"40px"}>
        <Heading fontSize={16} fontWeight={500} mb={"16px"}>
          Approved Accounts
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th color={"white"}>User name</Th>
                <Th color={"white"}>Email</Th>
                <Th isNumeric></Th>
              </Tr>
            </Thead>
            <Tbody>
              {APPROVED_ACCOUNTS.map((user) => (
                <Tr key={user.email}>
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td isNumeric>
                    <button onClick={() => onRemoveAccountHandler(user)}>Remove account</button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
