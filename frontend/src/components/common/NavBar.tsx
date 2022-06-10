import { createContext, KeyboardEvent, useContext } from "react"
import { Link } from "react-router-dom"
import { Auth } from "aws-amplify"

import { useNavigateWithSearchParams } from "utils/router"

import { ReactComponent as Logo } from '../../assets/beckett-comic-logo.svg'

export const NavBarContext = createContext({
  text: "",
  setText: (_text: string) => {},
})

export default function NavBar() {
  return (
    <div className="sticky top-0 z-10 w-full bg-hdr-ftr flex justify-center">
      <div className="page-padding flex justify-center">
        <div className="container-large ">
          <div className="grid items-center justify-center w-full h-24 grid-cols-navbar ">
            <Logo />
            <Search />
            <Buttons />
          </div>
        </div>
      </div>
    </div>
  )
}

// function Logo() {
//   const { setText } = useContext(NavBarContext)

//   return (
//     <div className="flex items-center justify-center">
//       <Link to="/dashboard" onClick={() => setText("")}>
//         <img src={logoSrc} alt="" />
//       </Link>
//     </div>
//   )
// }

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
      <div className="flex items-center w-full">
        <i className="fa-solid fa-magnifying-glass absolute ml-2.5 text-tmp-icon" />
        <input
          className="w-full h-8 pl-10 rounded bg-form-fields text-tmp-icon focus:outline-none"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={onKeyPress}
        />
      </div>
      <button
        className="h-8 text-center rounded-full w-28 bg-gradient-to-r from-primary-button-start to-primary-button-stop text-tmp-search-text"
        onClick={navigateToSearchPage}
      >
        Search
      </button>
    </div>
  )
}

function Buttons() {
  async function signOut() {
    try {
      await Auth.signOut({ global: true })
    } catch (error) {
      console.log("error signing out: ", error)
    }
  }
  
  return (
    <div className="flex justify-end text-xl space-x-7 text-tmp-icon">
      <button>
        <i className="fa-regular fa-bell" />
      </button>
      <button onClick={signOut}>
        <i className="fa-solid fa-arrow-right-from-bracket" />
      </button>
      <button>
        <i className="fa-solid fa-bars" />
      </button>
    </div>
  )
}
