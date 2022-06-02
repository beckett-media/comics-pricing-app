import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "@fortawesome/fontawesome-free/css/all.css"
import "./index.css"
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider>
      <App />
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
)
