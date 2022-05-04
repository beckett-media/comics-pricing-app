import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Search from "./pages/Search"
import IssueDetails from "./pages/IssueDetails"
import axios from "axios"
import { SWRConfig } from "swr"

export default function App() {
  return (
    <SWRConfig value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/search/:query"} element={<Search />} />
        <Route path={"/details/:issueId"} element={<IssueDetails />} />
      </Routes>
    </SWRConfig>
  )
}
