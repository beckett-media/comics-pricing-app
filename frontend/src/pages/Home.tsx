import useSWR from "swr"
import { Navigate } from "react-router-dom"

import MarketingContent from "components/home/MarketingContent"
import Header from "components/home/Header"

export default function Home() {
  const { data, error } = useSWR(`/api/auth/check`)

  if (!data && !error) {
    return <div>loading</div>
  }

  if (data) {
    return <Navigate to={"/dashboard"} />
  }

  return (
    <div>
      <Header />
      <MarketingContent />
    </div>
  )
}
