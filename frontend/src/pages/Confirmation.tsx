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
import { CodeField } from "components/Confirmation/CodeField"

import Background_Pattern_1280_w from "../assets/Background_Pattern_1280_w.svg"

const Confirmation = () => (
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
      <Container py={25}>

        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={"#212022"}
          boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
          borderRadius={{ base: "none", sm: "xl" }}
        >

          <Stack>
            <Stack spacing={{ base: "6", md: "6" }} textAlign="center">

              <Heading
                fontSize={25}
                fontWeight={600}
                color="white"
                size={useBreakpointValue({ base: "xs", md: "sm" })}

                CONFIRMED
              </Heading>
              <HStack spacing="10" justify="center">
                <Text color="white" px={10}>
                  Thanks for signing up! Check your inbox for your login link and temporary
                  password.
                </Text>

              </HStack>
            </Stack>
          </Stack>
          <Stack spacing="6" mt={5}>

            <Box display={"flex"} justifyContent={"center"}>
              <Button
                onClick={() => {
                  window.location.href = "/"
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

                Return Home
              </Button>
            </Box>
            
          </Stack>
        </Box>
      </Container>
    </Box>
    <Box bg={"#0C0822"} style={{ position: "absolute", bottom: 0, width: "100%", height: "80px" }}>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"} h={"100%"} w={"100%"}>
        <Image src={require("../assets/logoDown.png")} alt="logo" />
      </Box>
    </Box>
  </Box>
)

export default Confirmation
