import axios from "axios"
import { Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"
import Home from "./pages/Home"
import { withCheckLoggedIn } from "./pages/Login"
import Search from "./pages/Search"
import IssueDetails from "./pages/IssueDetails"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const DashboardPage = withCheckLoggedIn(Dashboard)
  const SearchPage = withCheckLoggedIn(Search)
  const DetailsPage = withCheckLoggedIn(IssueDetails)
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url, { withCredentials: true }).then((res) => res.data),
      }}
    >
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<DashboardPage />} />
        <Route path={"/search"} element={<SearchPage />} />
        <Route path={"/details/:issueId"} element={<DetailsPage />} />
      </Routes>
    </SWRConfig>
  )
}
