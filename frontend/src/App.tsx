import React, { useEffect, useState } from "react"
import { Routes, Route, useLocation, Navigate } from "react-router-dom"
import { SWRConfig } from "swr"
import { API } from "aws-amplify"

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
import NewPassword from "pages/NewPassword"
import ResetPassword from "pages/ResetPassword"
import Landing from "pages/Landing/Landing"

import { useAuth } from "providers/auth"

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isLoggedIn, isAuthChecking } = useAuth()
  // const isLoggedIn = true;
  // const isAuthChecking = false;
  let location = useLocation()

  if (isAuthChecking) {
    return <Box>Loading...</Box>
  }

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

function OnlyNonAuth({ children }: { children: JSX.Element }) {
  let { isLoggedIn, isAuthChecking } = useAuth()
  // const isLoggedIn = true;
  // const isAuthChecking = false;

  if (isAuthChecking) {
    return <Box>Loading...</Box>
  }

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return children
}

const apiName = "comicsapi"
const fetcher = (path: string) =>
  API.get(apiName, `/api${path}`, { response: true }).then((response) => response.data)

export default function App() {
  const AuthenticatedLayout = withCheckLoggedIn(Layout)

  return (
    <SWRConfig value={{ fetcher }}>
      <Box h={"100vh"}>
        <Routes>
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route path={"dashboard"} element={<Dashboard />} />
            <Route path={"admin"} element={<Admin />} />
            <Route path={"search"} element={<Search />} />
            <Route path={"details/:issueId"} element={<IssueDetails />} />
          </Route>
          {/* // TODO: Redirect it already authed */}
          <Route
            path={"/login"}
            element={
              <OnlyNonAuth>
                <Login />
              </OnlyNonAuth>
            }
          />
          <Route
            path={"/signup"}
            element={
              <OnlyNonAuth>
                <SignUp />
              </OnlyNonAuth>
            }
          />
          <Route path={"/landing"} element={<Landing />} />
          <Route path={"/confirmation"} element={<Confirmation />} />
          <Route path={"/reset-password"} element={<ResetPassword />} />
          <Route path={"/newPassword"} element={<NewPassword />} />
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
    </SWRConfig>
  )
}
