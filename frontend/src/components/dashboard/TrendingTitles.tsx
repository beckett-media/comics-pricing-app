import useSWR from "swr"
import { Link } from "react-router-dom"

import { ReactComponent as TrendingIcon } from "assets/trending.svg"
import { ReactComponent as Chevron } from "assets/chevron.svg"
import * as React from "react"
import { API } from "aws-amplify"
import type { IssueMinimal } from "types/api"

export default function TrendingTitles() {
  //const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/trending")

  const [issues, setData] = React.useState<IssueMinimal[]>([])

  const apiName = "comicsapi"
  const path = "/api/issue/trending"
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
    return <div>no data</div>
  }

  return (
    <div className="w-full">
      <div className="h-40 divide-y-2 divide-list-line rounded bg-container-outer p-2">
        <div className="flex gap-2 p-2 text-sm text-white">
          <div className="pt-1">
            <TrendingIcon />
          </div>
          Trending Titles
        </div>
        <div className="divide-y-2 divide-list-line text-xs text-white">
          {issues?.map(({ id, issue, title }) => (
            <div className="flex flex-row justify-between p-2" key={id}>
              <div className="w-7/12 truncate">
                {title} #{issue}
              </div>
              <Link key={id} to={`/details/${id}`}>
                <div className="flex flex-row text-secondary-link-text">
                  <p className="pr-3">View Prices</p>
                  <div className="pt-1">
                    <Chevron />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
