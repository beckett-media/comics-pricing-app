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
import React from "react"
import { DataStore } from "@aws-amplify/datastore"
import { WaitingListComics, ComicWaitingListStatus } from "../../models"
import { User } from "./data"
import ApproveModal from "./ApproveModal"
import RemoveModal from "./RemoveModal"
import { Auth, API } from "aws-amplify"
import { v4 as uuidv4 } from "uuid"

export default function UserList() {
  const { isOpen: isApproveOpen, onOpen: openApprove, onClose: closeApprove } = useDisclosure()
  const { isOpen: isRemoveOpen, onOpen: openRemove, onClose: closeRemove } = useDisclosure()
  const [userA, setUserA] = React.useState<User | any>()
  const [userR, setUserR] = React.useState<User | any>()

  const [waitList, setWaitList] = React.useState<WaitingListComics[] | any>([])
  const [userPool, setUserPool] = React.useState<any>()
  const [loading, setLoading] = React.useState(true)
  const [tempPassword, setTempPassword] = React.useState("")

  const onApproveAccessHandler = async (user: User) => {
    await generatePassword()
    setUserA(user)
    openApprove()
  }
  // generate 8 character fron uuidv4 for password
  const generatePassword = async () => {
    const password = uuidv4().substring(0, 8)
    setTempPassword(password)
  }

  const approveUser = async () => {
    const { username, email } = userA
    await createUser(username, email)
    return true
  }

  const onRemoveAccountHandler = async (user: any) => {
    setUserR(user)
    console.log(user.Username)
    DisableUser(user.Username)
    openRemove()
  }

  const removeUser = () => {
    // remove user
    return true
  }

  // get list of users pool from AdminAPIQuery
  async function listUsersApproved() {
    let apiName = "AdminQueries"
    let path = "/listUsers"
    let myInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
    }
    await API.get(apiName, path, myInit).then((response) => {
      const { Users } = response
      setUserPool(Users)
      setLoading(false)
    })
  }

  // get list of users pool from AdminAPIQuery
  async function DisableUser(email: string) {
    let apiName = "AdminQueries"
    let path = "/disableUser"
    let myInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
      },
      body: {
        username: email,
      },
    }
    await API.get(apiName, path, myInit).then((response) => {
      console.log(response)
      setLoading(false)
    })
  }

  const getData = async () => {
    await DataStore.query(WaitingListComics)
      .then((response) => {
        setWaitList(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // create a new user in cognito
  async function createUser(username: string, email: string) {
    let apiName = "AdminQueries"
    let path = "/createUser"
    let myInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth?.currentSession()).getAccessToken().getJwtToken()}`,
      },
      body: {
        password: `Temp@${tempPassword}!`,
        username: email,
        name: username,
      },
    }
    await API.post(apiName, path, myInit).then((response) => {
      try {
        const { User } = response
        console.log(User)
      } catch (e) {
        console.log(e)
      }
    })
  }

  React.useEffect(() => {
    getData()
    listUsersApproved()
  }, [loading])

  return (
    <Box>
      <Heading fontSize={20} fontWeight={500}>
        Manage Users
      </Heading>
      <ApproveModal
        user={userA}
        isOpen={isApproveOpen}
        onClose={closeApprove}
        onApprove={approveUser}
      />
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
              {waitList.map((user: { email: any; username: any }) => (
                <Tr key={user?.email}>
                  <Td>{user?.username}</Td>
                  <Td>{user?.email}</Td>
                  <Td isNumeric color={"#66C9FF"}>
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
              {/* {userPool.map((user: { email: any; username: any; }) => (
                <Tr key={user?.email}>
                  <Td>{user?.username}</Td>
                  <Td>{user?.email}</Td>
                  <Td isNumeric color={"#66C9FF"}>
                    <button onClick={() => onRemoveAccountHandler(user)}>Remove account</button>
                  </Td>
                </Tr>
              ))} */}
              {userPool?.map(
                (user: {
                  Username?: any
                  Attributes?: any
                  UserCreateDate?: any
                  index?: any
                  username?: string
                  email?: string
                }) => {
                  const { Username, Attributes, UserCreateDate, index } = user
                  return (
                    <Tr key={index}>
                      {user.Attributes.length <= 2 && <Td>{Username}</Td>}
                      {user.Attributes.length >= 3 && <Td>{Attributes[1].Value}</Td>}
                      <Td>
                        {Attributes?.find((a: { Name: string }) => a?.Name === "email").Value}
                      </Td>
                      <Td isNumeric color={"#66C9FF"}>
                        <button
                        onClick={() => onRemoveAccountHandler(user)}
                        >
                          Remove account
                        </button>
                      </Td>
                    </Tr>
                  )
                }
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
