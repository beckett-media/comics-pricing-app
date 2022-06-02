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
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { PasswordField } from "components/NewPassword/PasswordField"

import Background_Pattern_1280_w from "../assets/Background_Pattern_1280_w.svg"

const NewPassword = ({ ...props }) => {
  let navigate = useNavigate()
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
                  <FormLabel htmlFor="email" color="white">
                    Code
                  </FormLabel>
                  <Input
                    borderColor={"transparent"}
                    id="email"
                    type="email"
                    bg="#42404D"
                    h={12}
                    value={props.value}
                    onChange={props.onChange}
                  />
                </FormControl>
              </Stack>
            </Stack>

            <Stack spacing="6" mt={5}>
              <Stack spacing="5">
                <PasswordField value={props.value} onChange={props.onChange} />
              </Stack>
              <Box display={"flex"} justifyContent={"center"}>
                <Button
                  onClick={() => {
                    navigate("/login")
                  }}
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
