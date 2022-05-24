import useSWR from "swr"
import { Link } from "react-router-dom"

import { ReactComponent as TrendingIcon } from "assets/trending.svg"
import { ReactComponent as Chevron } from "assets/chevron.svg"

import type { IssueMinimal } from "types/api"

export default function TrendingTitles() {
  const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/trending")

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
          {issues?.map(({ id, issue, title }, idx) => (
            <div className="flex flex-row justify-between p-2" key={idx}>
              {title} #{issue}
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
