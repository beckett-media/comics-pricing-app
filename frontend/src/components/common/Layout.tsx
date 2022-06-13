import { useState } from "react"
import { Outlet } from "react-router-dom"

import Footer from "components/common/Footer"
import NavBar, { NavBarContext } from "components/common/NavBar"

import {ReactComponent as BgGraphic} from '../../assets/comic-bg-graphic.svg'

export default function Layout() {
  const [text, setText] = useState("")

  return (
    <div className="bg-gradient-to-b from-grad-top to-grad-bot font-body relative flex flex-col items-center">
      <BgGraphic className="absolute z-0 align-center"></BgGraphic>
      <NavBarContext.Provider value={{ text, setText }}>
        <div className="relative z-10 w-full flex flex-col items-center">
          <NavBar />
          <div className="page-padding">
            <div className="container-large">
              <Outlet />
            </div>
          </div>
        </div>
      </NavBarContext.Provider>
      <div className="relative z-10 w-full">
        <Footer />
      </div>
      <BgGraphic className="absolute z-0 rotate-180 bottom-0"></BgGraphic>
    </div>
  )
}
