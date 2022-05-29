import { ComponentType } from "react"
import useSWR from "swr"
import { createSearchParams, Navigate, useNavigate } from "react-router-dom"

export function withCheckLoggedIn(Component: ComponentType) {
  return () => {
    const { data, error } = useSWR(`/api/auth/check`, {})

    if (error) {
      return <Navigate to={"/"} />
    }

    if (!data) {
      return <div>loading</div>
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
