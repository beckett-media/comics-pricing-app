import useSWR from "swr"
import { useNavigate } from "react-router-dom"

import { ReactComponent as TrendingIcon } from "assets/trending.svg"
import { ReactComponent as Chevron } from "assets/chevron.svg"

import type { IssueMinimal } from "types/api"

export default function TrendingTitles() {
  const navigate = useNavigate()
  const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/trending")

  return (
    <div className="divide-y-1 divide-list-line rounded bg-container-outer py-4 px-5 text-white">
      <div className="flex items-center gap-2 border-b-2 border-list-line pb-2 text-sm text-white">
        <div>
          <TrendingIcon />
        </div>
        <div>Trending Titles</div>
      </div>
      {issues?.map(({ id, issue, title }) => (
        <div
          className="grid cursor-pointer grid-cols-list-item items-center py-2 px-3 text-xs hover:bg-container-inner"
          onClick={() => navigate(`/details/${id}`)}
        >
          <div className="flex min-w-0 justify-between gap-4 pr-3">
            <div className="truncate">
              {title} #{issue}
            </div>
            <div className="whitespace-nowrap text-secondary-link-text">View Prices</div>
          </div>
          <Chevron />
        </div>
      ))}
      <div></div>
    </div>
  )
}
