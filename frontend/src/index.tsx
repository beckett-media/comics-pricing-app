import { StrictMode } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "@fortawesome/fontawesome-free/css/all.css"
import "./index.css"
import { ChakraProvider } from "@chakra-ui/react"
import Amplify, { Auth } from 'aws-amplify';

import awsconfig from './aws-exports';
import { AuthProvider } from 'providers/auth';
Amplify.configure(awsconfig);


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
