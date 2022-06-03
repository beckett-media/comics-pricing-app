import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "@fortawesome/fontawesome-free/css/all.css"
import "./index.css"
import { ChakraProvider } from "@chakra-ui/react"
import { Amplify } from "aws-amplify"

import { AuthProvider } from "providers/auth"
import awsExports from "./aws-exports"


Amplify.configure(awsExports)

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
)
