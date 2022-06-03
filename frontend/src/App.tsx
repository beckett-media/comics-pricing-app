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
import NewPassword from "pages/NewPassword"
import ResetPassword from "pages/ResetPassword"

import { useAuth } from "providers/auth"

function RequireAuth({ children }: { children: JSX.Element }) {
  let { isLoggedIn, isAuthChecking } = useAuth()
  let location = useLocation()

  console.log("isLoggedIn", { isLoggedIn, isAuthChecking })

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

  if (isAuthChecking) {
    return <Box>Loading...</Box>
  }

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return children
}

export default function App() {
  // const AuthenticatedLayout = withCheckLoggedIn(Layout)

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route
            path={"dashboard"}
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={"admin"}
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path={"search"}
            element={
              <RequireAuth>
                <Search />
              </RequireAuth>
            }
          />
          <Route
            path={"details/:issueId"}
            element={
              <RequireAuth>
                <IssueDetails />
              </RequireAuth>
            }
          />

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
        </Route>
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
    </>
  )
}
