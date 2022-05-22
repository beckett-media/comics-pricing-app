import useSWR from "swr"
import { Link } from "react-router-dom"

import { ReactComponent as TrendingIcon } from "assets/trending.svg"
import type { IssueMinimal } from "types/api"

export default function TrendingTitles() {
  const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/trending")

  return (
    <div className="w-full">
      <div className="h-36 divide-y-2 divide-list-line overflow-scroll rounded bg-container-outer p-2">
        <div className="flex gap-2 p-2 text-sm text-white">
          <TrendingIcon />
          Trending Titles
        </div>
        <div className="divide-y-2 divide-list-line text-xs text-white">
          {issues?.map(({ id, issue, title }) => (
            <div className="flex flex-row justify-between p-2">
              {title} #{issue}
              <Link key={id} to={`/details/${id}`}>
                <div className="flex flex-row text-secondary-link-text">
                  View Prices
                  <img src={require("assets/chevron.svg").default} alt="" className="pl-3" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
