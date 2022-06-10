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
} from "@chakra-ui/react"
import { APPROVED_ACCOUNTS, User, WAITLIST_REQUESTS } from "./data"

export default function UserList() {
  const onApproveAccessHandler = (user: User) => {

  }

  const onRemoveAccountHandler = (user: User) => {

  }

  return (
    <Box>
      <Heading fontSize={20} fontWeight={500}>
        Manage Users
      </Heading>
      <Box mt={"40px"}>
        <Heading fontSize={16} fontWeight={500} mb={"16px"}>
          Waitlist Requests
        </Heading>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>User name</Th>
                <Th>Email</Th>
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
                <Th>User name</Th>
                <Th>Email</Th>
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
