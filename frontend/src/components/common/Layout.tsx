import { useState } from "react"
import { Outlet } from "react-router-dom"

import Footer from "components/common/Footer"
import NavBar, { NavBarContext } from "components/common/NavBar"

import bg from '../../assets/comic-bg-graphic.png'

export default function Layout() {
  const [text, setText] = useState("")

  return (
    <div className="bg-gradient-to-b from-grad-top to-grad-bot font-body relative flex flex-col items-center">
      <div className="bg-container absolute z-0 align-center">
        <img src={bg} alt="background graphic" className="absolute z-0 align-center object-cover"/>
      </div>
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
      <div className="bg-container absolute bottom-0 z-0 align-center">
        <img src={bg} alt="background graphic" className="absolute z-0 rotate-180 bottom-0 align-center object-cover w-min"/>
      </div>
    </div>
  )
}
