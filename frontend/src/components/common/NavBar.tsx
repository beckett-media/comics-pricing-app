import { KeyboardEvent, useState } from "react"
import { createSearchParams, Link, useNavigate } from "react-router-dom"

import { useNavigateWithSearchParams } from "utils/router"

const logoSrc = "https://beckett-assets.s3.amazonaws.com/beckett-comic-pricing-logo.svg"

export default function NavBar() {
  return (
    <div className="sticky top-0 grid z-10 h-24 w-full grid-cols-navbar bg-hdr-ftr items-center justify-center">
      <Logo />
      <Search />
      <Buttons />
    </div>
  )
}

function Logo() {
  return (
    <div className="flex items-center justify-center">
      <Link to="/">
        <img src={logoSrc} alt=""/>
      </Link>
    </div>
  )
}

function Search() {
  const [text, setText] = useState("")
  const navigate = useNavigateWithSearchParams()

  const navigateToSearchPage = () => navigate("/search", { q: text })
  const onKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      navigateToSearchPage()
    }
  }

  return (
    <div className="flex justify-center gap-3">
      <div className="flex items-center w-full">
        <i className="ml-2.5 absolute fa-solid fa-magnifying-glass text-tmp-icon" />
        <input
          className="pl-10 h-8 w-full rounded bg-form-fields text-tmp-icon focus:outline-none"
          value={text}
          onChange={event => setText(event.target.value)}
          onKeyPress={onKeyPress}
        />
      </div>
      <button
        className="text-tmp-search-text h-8 w-28 rounded-full bg-gradient-to-r from-primary-button-start to-primary-button-stop text-center"
        onClick={navigateToSearchPage}
      >
        Search
      </button>
    </div>
  )
}

function Buttons() {
  return (
    <div className="flex justify-center space-x-7 text-tmp-icon text-xl">
      <button>
        <i className="fa-regular fa-bell" />
      </button>
      <button>
        <i className="fa-solid fa-bars" />
      </button>
    </div>
  )
}
