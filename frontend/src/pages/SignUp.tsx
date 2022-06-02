import * as React from "react"
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
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
import { PasswordFieldSignUp } from "components/SignUp/PasswordFieldSignUp"
import { Auth } from "aws-amplify"
import { type } from "os"

const SignUp = ({ ...props }) => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  async function signUp() {
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
      })
      console.log(user)
    } catch (error) {
      console.log("error signing up:", error)
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
          <Image src={require("../assets/logoTop.png")} alt="logo" width={180} />
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
              <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
                <Heading
                  mt={5}
                  fontSize={20}
                  fontWeight={600}
                  color="white"
                  size={useBreakpointValue({ base: "xs", md: "sm" })}
                  display={"flex"}
                  justifyContent={"center"}
                  px={19}
                >
                  Join our waitlist to get access to the hottest comics in the market!

                </Heading>
                <HStack spacing="1" justify="center">
                  <Text color="white">Already have an account?</Text>
                  <Button
                    variant="link"
                    colorScheme="blue"
                    _focus={{ boxShadow: "none" }}
                    onClick={() => {
                      window.location.href = "/login"
                    }}
                  >
                    Login
                  </Button>
                </HStack>
              </Stack>
              <Box />

            </Stack>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email" color="white">
                    Email
                  </FormLabel>
                  <Input
                    id="email"
                    type="email"
                    bg="#42404D"
                    h={12}
                    value={props.value}
                    onChange={props.onChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email" color="white">
                    Name
                  </FormLabel>
                  <Input
                    id="name"
                    type="name"
                    bg="#42404D"
                    h={12}
                    value={props.value}
                    onChange={props.onChange}
                  />
                </FormControl>

              </Stack>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  borderRadius={{ base: "none", sm: "xl" }}
                  w={200}
                  h={12}
                  background="linear-gradient(to right, #C1F8E3, #6CD7D4)"
                  color={"black"}
                  fontWeight={"bold"}
                  _focus={{ boxShadow: "none" }}
                  my={5}
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

export default SignUp
