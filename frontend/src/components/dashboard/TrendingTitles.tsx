import useSWR from "swr"
import { Link } from "react-router-dom"

import { ReactComponent as TrendingIcon } from "assets/trending.svg"
import { ReactComponent as Chevron } from "assets/chevron.svg"
import * as React from "react"
import { API } from "aws-amplify"
import type { IssueMinimal } from "types/api"

export default function TrendingTitles() {
  const { data: issues } = useSWR<IssueMinimal[]>("/issue/trending")

  return (
    <div className="w-full">
      <div className="h-40 p-2 divide-y-2 rounded divide-list-line bg-container-outer">
        <div className="flex gap-2 p-2 text-sm text-white">
          <div className="pt-1">
            <TrendingIcon />
          </div>
          Trending Titles
        </div>
        <div className="text-xs text-white divide-y-2 divide-list-line">
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
