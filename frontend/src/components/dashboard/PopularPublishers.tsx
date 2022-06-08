import useSWR from "swr"
import * as React from "react"

import Gallery from "./Gallery"
import Publisher from "./Publisher"
import type { Publisher as PublisherData } from "types/api"
import { API } from "aws-amplify"

export default function PopularPublishers() {
  // const { data: publishers } = useSWR<PublisherData[]>("/api/publisher/popular")

  const [publishers, setData] = React.useState<PublisherData[]>([])

  const apiName = "comicsapi"
  const path = "/api/publisher/popular"
  const myInit = {
    // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  }

  React.useEffect(() => {
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setData(response?.data?.rows)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }, [])

  if (!publishers) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Publishers" link="/">
      {publishers.map(({ id, name }) => (
        <Publisher key={id} id={id} name={name} />
      ))}
    </Gallery>
  )
}
