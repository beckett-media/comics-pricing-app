import React, { useEffect, useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
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
import SignUp from "./pages/SignUp"
import Confirmation from "pages/Confirmation"
import ConfirmPassword from "pages/ConfirmPassword"
import NewPassword from "pages/NewPassword"
import ResetPassword from "pages/ResetPassword"

import { useAuth } from "providers/auth"

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isLoggedIn } = useAuth()
  let location = useLocation()

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default function App() {
  const AuthenticatedLayout = withCheckLoggedIn(Layout)

  const { isLoggedIn } = useAuth()

  return (
    <Box h={"100vh"}>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        >
          <Route path={"dashboard"} element={<Dashboard />} />
          <Route path={"admin"} element={<Admin />} />
          <Route path={"search"} element={<Search />} />
          <Route path={"details/:issueId"} element={<IssueDetails />} />
        </Route>

        {/* // TODO: Redirect it already authed */}
        <Route path={"/login"} element={<Login />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/confirmation"} element={<Confirmation />} />
        <Route path={"/confirmPassword"} element={<ConfirmPassword />} />
        <Route path={"/reset-password"} element={<ResetPassword />} />
        <Route path={"/newPassword"} element={<NewPassword />} />
      </Routes>

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
