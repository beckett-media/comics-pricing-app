import axios from "axios"
import { Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"

import Home from "pages/Home"
import Search from "pages/Search"
import IssueDetails from "pages/IssueDetails"
import Dashboard from "pages/Dashboard"
import Layout from "components/common/Layout"
import { withCheckLoggedIn } from "utils/login"
import Admin from "./pages/Admin"
import { Toaster } from "react-hot-toast"

export default function App() {
  const AuthenticatedLayout = withCheckLoggedIn(Layout)

  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url, { withCredentials: true }).then((res) => res.data),
      }}
    >
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/"} element={<AuthenticatedLayout />}>
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
    </SWRConfig>
  )
}
