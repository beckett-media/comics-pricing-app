import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  Image,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useNavigate, useLocation } from "react-router-dom"
import React from "react"
import { PasswordField } from "components/NewPassword/PasswordField"
import { Auth } from "aws-amplify"
import Background_Pattern_1280_w from "../assets/Background_Pattern_1280_w.svg"

type NewEmailProps = {
  email: string
}

const NewPassword = ({ ...props }) => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { email } = (state || {} ) as NewEmailProps

  const [new_password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [code, setCode] = React.useState("")

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const onSubmit = async () => {
    // Collect confirmation code and new password, then
    Auth.forgotPasswordSubmit(email, code, new_password)
      .then((data) => {
        console.log(data)
        navigate("/login")
      })
      .catch((err) => console.log(err))
  }

  if (!email) {
    navigate("/reset-password");
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
        <Container px={14}>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={"#212022"}
            boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack spacing="10">
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading
                  my={8}
                  fontSize={25}
                  fontWeight={600}
                  color="white"
                  size={useBreakpointValue({ base: "xs", md: "sm" })}
                >
                  SET NEW PASSWORD
                </Heading>
              </Stack>
            </Stack>

            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="code" color="white">
                    Code
                  </FormLabel>
                  <Input
                    borderColor={"transparent"}
                    id="code"
                    type="text"
                    bg="#42404D"
                    h={12}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </Stack>

            <Stack spacing="6" mt={5}>
              <Stack spacing="5">
                <FormLabel htmlFor="email" color="white">
                  New Password
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    borderColor={"transparent"}
                    id="newpassword"
                    type={show ? "text" : "password"}
                    placeholder="New password"
                    bg="#42404D"
                    autoComplete="current-password"
                    required
                    security="high"
                    h={12}
                    value={new_password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Box h="1.75rem" fontSize={12} onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Stack spacing="5">
                <FormLabel htmlFor="email" color="white">
                  Confirm Password
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    borderColor={"transparent"}
                    id="confirmpassword"
                    type={show ? "text" : "password"}
                    placeholder="confirm password"
                    bg="#42404D"
                    autoComplete="current-password"
                    required
                    security="high"
                    h={12}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Box h="1.75rem" fontSize={12} onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Box>
                  </InputRightElement>
                </InputGroup>
              </Stack>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={() => onSubmit()}
                  my={5}
                  borderRadius={100}
                  w={200}
                  h={12}
                  background="linear-gradient(to right, #C1F8E3, #6CD7D4)"
                  color={"black"}
                  fontWeight={"bold"}
                  _focus={{ boxShadow: "none" }}
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

export default NewPassword
