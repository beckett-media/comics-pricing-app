import { ComponentType } from "react"
import { Navigate } from "react-router-dom"
import Cookies from "js-cookie"

const TOKEN = "access"

export function withCheckLoggedIn(Component: ComponentType) {
  return () => {
    const cookie = Cookies.get(TOKEN)

    // TODO(enricozb): cookie needs to be validated

    return cookie ? <Component /> : <Navigate to={"/"} />
  }
}
