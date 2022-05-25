import useSWR from "swr"
import { useNavigate } from "react-router-dom"

import { ReactComponent as DownArrow } from "assets/down-arrow.svg"
import { ReactComponent as Chevron } from "assets/chevron.svg"
import { ReactComponent as DownTriangle } from "assets/down-triangle.svg"

import type { IssueTrends } from "types/api"

export default function RecentPriceDrops() {
  const navigate = useNavigate()
  const { data: issues } = useSWR<IssueTrends[]>("/api/issue/recent-price-drops")

  return (
    <div className="divide-y-1 divide-list-line rounded bg-container-outer py-4 px-5 text-white">
      <div className="flex items-center gap-2 border-b-2 border-list-line pb-2 text-sm text-white">
        <div>
          <DownArrow />
        </div>
        <div>Price Drops</div>
      </div>
      {issues?.map(({ id, issue, title, price }) => (
        <div
          className="grid cursor-pointer grid-cols-list-item items-center py-2 px-3 text-xs hover:bg-container-inner"
          onClick={() => navigate(`/details/${id}`)}
        >
          <div className="flex min-w-0 justify-between gap-4 pr-3">
            <div className="truncate">
              {title} #{issue}
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap fill-emerald-500 text-emerald-500">
              <DownTriangle />
              <div>${Number(price).toFixed(2)}</div>
            </div>
          </div>
          <Chevron />
        </div>
      ))}
      <div></div>
    </div>
  )
}
