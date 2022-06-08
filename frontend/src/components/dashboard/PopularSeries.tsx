import useSWR from "swr"

import Gallery from "./Gallery"
import Title from "components/common/Title"
import type { Title as TitleData } from "types/api"
import { API } from "aws-amplify"
import * as React from "react"

export default function PopularSeries() {
  //const { data: titles } = useSWR<TitleData[]>("/api/title/popular")

  const [titles, setData] = React.useState<TitleData[]>([])

  const apiName = "comicsapi"
  const path = "/api/title/popular"
  const myInit = {
    // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  }

  React.useEffect(() => {
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setData(response?.data)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }, [])

  if (!titles) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Series">
      {titles.map(({ id, name, publisher }) => (
        <Title key={id} id={id} name={name} publisher={publisher} />
      ))}
    </Gallery>
  )
}
