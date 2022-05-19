import { ComponentType } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import Cookies from "js-cookie"

const TOKEN_NAME = "access"

export function withCheckLoggedIn(Component: ComponentType) {
  return () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const token = searchParams.get(TOKEN_NAME)

    if (token) {
      Cookies.set(TOKEN_NAME, token)
      searchParams.delete(TOKEN_NAME)
      setSearchParams(searchParams)
    }

    const cookie = Cookies.get(TOKEN_NAME)

    // TODO(enricozb): cookie needs to be validated

    return cookie ? <Component /> : <Navigate to={"/"} />
  }
}
