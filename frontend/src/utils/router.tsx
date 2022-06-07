import { ComponentType } from "react"
import useSWR from "swr"
import { createSearchParams, Navigate, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "providers/auth"

export function withCheckLoggedIn(Component: ComponentType) {
  return () => {
    // const { data, error } = useSWR(`/api/auth/check`)
    const { isLoggedIn, isAuthChecking } = useAuth();
    let location = useLocation();

    if (isAuthChecking) {
      return <div>loading</div>
    }

    if (!isLoggedIn) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />
    }

    return <Component />
  }
}

export function useNavigateWithSearchParams() {
  const navigate = useNavigate()

  return (pathname: string, searchParams: Record<string, string>) =>
    navigate({
      pathname,
      search: `?${createSearchParams(searchParams)}`,
    })
}
