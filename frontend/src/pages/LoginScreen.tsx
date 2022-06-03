import * as React from "react"

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  Image,
} from "@chakra-ui/react"
import { PasswordField } from "../components/Login/PasswordField"
import Background_Pattern_1280_w from "../assets/Background_Pattern_1280_w.svg"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { Auth } from "aws-amplify"

const Login = ({ ...props }) => {
  let navigate = useNavigate()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  async function signIn() {
    try {
      setIsLoading(true)
      await Auth.signIn(email, password)
      // alert("Successfully signed in!")
    } catch (e) {
      alert(e.message)
      setError(e.message)
      setIsLoading(false)
    }
  }

  return (
    <Box
      w={"100%"}
      h={"100%"}
      background="linear-gradient(to bottom, #494752 10%, #493C6F 100%)"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={"#0C0822"}
        style={{
          zIndex: 6,
          position: "absolute",
          top: 10,
          width: "100%",
          height: "80px",
          marginTop: 30,
        }}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} h={"100%"} w={"100%"}>
          <Image
            onClick={() => {
              navigate("/")
            }}
            style={{ cursor: "pointer" }}
            src={require("../assets/logoTop.png")}
            alt="logo"
            width={180}
          />
        </Box>
      </Box>
      <Box
        w={"100%"}
        h={"100%"}
        backgroundImage={`url(${Background_Pattern_1280_w})`}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
        alignItems="center"
        justifyContent="center"
        display={"flex"}
      >
        <Container py={25} px={14}>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={"#212022"}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="6">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center" mb={7}>
                <Heading
                  fontSize={25}
                  fontWeight={600}
                  color="white"
                  size={useBreakpointValue({ base: "xs", md: "sm" })}
                >
                  LOGIN
                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="white">Don't have an account?</Text>
                  <Button
                    variant="link"
                    colorScheme="blue"
                    _focus={{ boxShadow: "none" }}
                    onClick={() => {
                      navigate("/signup")
                    }}
                  >
                    join waiting list
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Stack spacing="6">
              <Stack spacing="5">
                {error && (
                  <Text color="red.500" fontSize="sm">
                    {error}
                  </Text>
                )}
                <FormControl>
                  <FormLabel htmlFor="email" color="white">
                    Email
                  </FormLabel>
                  <Input
                    borderColor={"transparent"}
                    id="email"
                    type="email"
                    bg="#42404D"
                    h={12}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
              </Stack>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={() => {
                    signIn()
                    navigate("/")
                  }}
                  my={6}
                  borderRadius={100}
                  w={200}
                  h={12}
                  background="linear-gradient(to right, #C1F8E3, #6CD7D4)"
                  color={"black"}
                  fontWeight={"bold"}
                  _focus={{ boxShadow: "none" }}
                  isLoading={isLoading}
                >
                  Continue
                </Button>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        bg={"#0C0822"}
        style={{ position: "absolute", bottom: 0, width: "100%", height: "80px" }}
      >
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} h={"100%"} w={"100%"}>
          <Image src={require("../assets/logoDown.png")} alt="logo" />
        </Box>
      </Box>
    </Box>
  )
}
export default Login
