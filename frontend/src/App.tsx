import axios from "axios"
import React, { useEffect, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"

import Home from "pages/Home"
import Search from "pages/Search"
import IssueDetails from "pages/IssueDetails"
import Dashboard from "pages/Dashboard"
import Layout from "components/common/Layout"
import Admin from "./pages/Admin"
import { Toaster } from "react-hot-toast"
import { withCheckLoggedIn } from "utils/router"
import Login from "pages/LoginScreen"
import { Box } from "@chakra-ui/react"
import Background_Pattern_1280_w from "./assets/Background_Pattern_1280_w.svg"
import SignUp from "./pages/SignUp"
import Confirmation from "pages/Confirmation"
import ConfirmPassword from "pages/ConfirmPassword"
import { Auth, Hub } from "aws-amplify"


export default function App() {
  const AuthenticatedLayout = withCheckLoggedIn(Layout)

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: true, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
      .then((user) => {
        if (user === "The user is not authenticated") {
          setIsLoggedIn(false)
          window.location.href = "/signup"
        } else {
          setIsLoggedIn(true)
          window.location.href = "/login"
        }
      })
      .catch((err) => console.log(err))
  }, [isLoggedIn])

  return (
    <Box h={"100vh"}>
      <Routes>
        {/* Auth screens */}
        <Route path={"/"} element={<SignUp />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/confirmation"} element={<Confirmation />} />
        <Route path={"/confirmPassword"} element={<ConfirmPassword />} />

        <Route path={"/"} element={<Home />}>
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"admin"} element={<Admin />} />
          <Route path={"search"} element={<Search />} />
          <Route path={"details/:issueId"} element={<IssueDetails />} />
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#FFFFFF",
          },
        }}
      />
    </Box>
  )
}
