import useSWR from "swr"
import { Link } from "react-router-dom"
import React from "react"
import Gallery from "./Gallery"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"
import { API } from "aws-amplify"

export default function PopularComics() {
  // const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/popular")
  const [issues, setData] = React.useState<IssueMinimal[]>([])

  const apiName = "comicsapi"
  const path = "/api/issue/popular"
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

  if (!issues) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Comics">
      {issues.map(({ id, issue, title, publisher }) => (
        <Link key={id} to={`/details/${id}`}>
          <Issue id={id} issue={issue} title={title} publisher={publisher} />
        </Link>
      ))}
    </Gallery>
  )
}
