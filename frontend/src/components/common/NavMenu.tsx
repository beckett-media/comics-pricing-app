import React from "react"
import { Link } from "react-router-dom"
import { Auth } from "aws-amplify"

const NavMenu = () => {
  const basicItems = [
    {
      icon: "fa-regular fa-user",
      text: "My Profile",
      url: "/",
    },
    {
      icon: "fa-regular fa-bookmark",
      text: "My Watchlist",
      url: "/watchlist",
    },
  ]

  const adminItems = [
    {
      icon: "fa-regular fa-user",
      text: "My Profile",
      url: "/",
    },
    {
      icon: "fa-regular fa-users",
      text: "Manage Users",
      url: "/",
    },
  ]

  async function signOut() {
    try {
      await Auth.signOut({ global: true })
    } catch (error) {
      console.log("error signing out: ", error)
    }
  }

  return (
    <button className="nav-hover relative">
      <i className="fa-solid fa-bars" />
      <div className="nav-hover-content transition bg-container-inner absolute text-sm font-medium flex flex-col rounded right-0 w-max">
        {basicItems.map(item => (
          <Link to={item.url}>
            <div className="flex items-center px-6 py-4 transition hover:bg-nav-hover w-full rounded">
              <div className={`mr-2 ${item.icon}`}></div>
              <div>{item.text}</div>
            </div>
          </Link>
        ))}
        <div onClick={signOut} className="flex items-center px-6 py-4 transition hover:bg-nav-hover w-full rounded">
          <div className={`mr-2 fa-solid fa-arrow-right-from-bracket`}></div>
          <div>Sign Out</div>
        </div>
      </div>
    </button>
  )
}

export default NavMenu