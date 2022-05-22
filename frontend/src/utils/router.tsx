import { ComponentType } from "react"
import { createSearchParams, Navigate, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

const TOKEN = "access"

export function withCheckLoggedIn(Component: ComponentType) {
  return () => {
    const cookie = Cookies.get(TOKEN)

    // TODO(enricozb): cookie needs to be validated

    return cookie ? <Component /> : <Navigate to={"/"} />
  }
}

export function useNavigateWithSearchParams() {
  const navigate = useNavigate()

  return (pathname: string, searchParams: Record<string, string>) => navigate({
    pathname,
    search: `?${createSearchParams(searchParams)}`
  })
}
