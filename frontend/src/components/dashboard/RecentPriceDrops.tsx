import useSWR from "swr"
import { Link } from "react-router-dom"

import { ReactComponent as DownArrow } from "assets/down-arrow.svg"
import { ReactComponent as Chevron } from "assets/chevron.svg"
import { ReactComponent as DownTriangle } from "assets/down-triangle.svg"

import type { IssueTrends } from "types/api"

export default function RecentPriceDrops() {
  const { data: issues } = useSWR<IssueTrends[]>("/api/issue/recent-price-drops")

  return (
    <div className="w-full">
      <div className="h-40 divide-y-2 divide-list-line rounded bg-container-outer p-2">
        <div className="flex gap-2 p-2 text-sm text-white">
          <div className="pt-1">
            <DownArrow />
          </div>
          Recent Price Drops
        </div>
        <div className="divide-y-2 divide-list-line text-xs text-white">
          {issues?.map(({ id, issue, title, price }) => (
            <div className="flex flex-row justify-between p-2">
              {title} #{issue}
              <Link key={id} to={`/details/${id}`}>
                <div className="flex flex-row text-emerald-500">
                  <div className="fill-emerald-500 p-1.5">
                    <DownTriangle />
                  </div>
                  <p className="pr-3">${parseFloat(price).toFixed(2)}</p>
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
