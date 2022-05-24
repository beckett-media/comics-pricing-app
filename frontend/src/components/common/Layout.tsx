import { useState } from "react"
import { Outlet } from "react-router-dom"

import Footer from "components/common/Footer"
import NavBar, { NavBarContext } from "components/common/NavBar"

export default function Layout() {
  const [text, setText] = useState("")

  return (
    <div className="bg-gradient-to-b from-grad-top to-grad-bot">
      <NavBarContext.Provider value={{ text, setText }}>
        <NavBar />
        <Outlet />
      </NavBarContext.Provider>
      <Footer />
    </div>
  )
}
