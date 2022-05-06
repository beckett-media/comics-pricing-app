import axios from "axios"
import { Route, Routes } from "react-router-dom"
import { SWRConfig } from "swr"
import Dashboard from "./pages/Dashboard"
import Home from "./pages/Home"
import IssueDetails from "./pages/IssueDetails"
import Search from "./pages/Search"

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
