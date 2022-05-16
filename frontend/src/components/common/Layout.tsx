import { Outlet } from "react-router-dom"

import Footer from "components/common/Footer"
import NavBar from "components/common/NavBar"

export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  )
}
