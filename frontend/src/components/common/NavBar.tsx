import { createContext, KeyboardEvent, useContext } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as BeckettLogo } from "assets/beckett-logo.svg"
import { useNavigateWithSearchParams } from "utils/router"

export const NavBarContext = createContext({
  text: "",
  setText: (_text: string) => {},
})

export default function NavBar() {
  return (
    <div className="sticky top-0 z-10 grid h-24 w-full grid-cols-navbar items-center justify-center bg-hdr-ftr">
      <Logo />
      <Search />
      <Buttons />
    </div>
  )
}

function Logo() {
  const { setText } = useContext(NavBarContext)

  return (
    <div className="flex items-center justify-center">
      <Link to="/dashboard" onClick={() => setText("")}>
        <BeckettLogo />
      </Link>
    </div>
  )
}

function Search() {
  const { text, setText } = useContext(NavBarContext)
  const navigate = useNavigateWithSearchParams()

  const navigateToSearchPage = () => navigate("/search", text ? { q: text } : {})
  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      navigateToSearchPage()
    }
  }

  return (
    <div className="flex justify-center gap-3">
      <div className="flex w-full items-center">
        <i className="fa-solid fa-magnifying-glass absolute ml-2.5 text-tmp-icon" />
        <input
          className="h-8 w-full rounded bg-form-fields pl-10 text-tmp-icon focus:outline-none"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={onKeyPress}
        />
      </div>
      <button
        className="h-8 w-28 rounded-full bg-gradient-to-r from-primary-button-start to-primary-button-stop text-center text-tmp-search-text"
        onClick={navigateToSearchPage}
      >
        Search
      </button>
    </div>
  )
}

function Buttons() {
  return (
    <div className="flex justify-center space-x-7 text-xl text-tmp-icon">
      <button>
        <i className="fa-regular fa-bell" />
      </button>
      <button>
        <i className="fa-solid fa-bars" />
      </button>
    </div>
  )
}
