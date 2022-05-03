import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import IssueDetails from "./pages/IssueDetails";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/search/:query"} element={<Search />} />
        <Route path={"/details/:issueId"} element={<IssueDetails />} />
      </Routes>
    </div>
  );
}
