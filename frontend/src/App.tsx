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
