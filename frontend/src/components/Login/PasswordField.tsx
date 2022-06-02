import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react"
import * as React from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"

export const PasswordField = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const mergeRef = useMergeRefs(inputRef, ref)
  const onClickReveal = () => {
    onToggle()
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }

  return (
    <FormControl>
      <FormLabel htmlFor="password" color={"white"}>
        Password
      </FormLabel>
      <InputGroup>
        <InputRightElement>
          <IconButton
            variant="link"
            aria-label={isOpen ? "Mask password" : "Reveal password"}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          borderColor={"transparent"}
          h={12}
          bg="#42404D"
          id="password"
          ref={mergeRef}
          name="password"
          type={isOpen ? "text" : "password"}
          autoComplete="current-password"
          required
          value={props.value}
          onChange={props.onChange}
          {...props}
        />
      </InputGroup>
      <HStack justify="flex-start" my={3}>
        <Button
          _focus={{ boxShadow: "none" }}
          variant="link"
          colorScheme="blue"
          size="sm"
          onClick={() => {
            window.location.href = "/reset-password"
          }}
        >
          Forgot password?
        </Button>
      </HStack>
    </FormControl>
  )
})

PasswordField.displayName = "PasswordField"
