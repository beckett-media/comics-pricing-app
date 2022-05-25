import useSWR from "swr"
import { useNavigate } from "react-router-dom"

import { ReactComponent as Chevron } from "assets/chevron.svg"
import { ReactComponent as Sparkle } from "assets/sparkle.svg"

import { IssueTrends } from "types/api"

export default function NewComics() {
  const navigate = useNavigate()
  const { data: issues } = useSWR<IssueTrends[]>("/api/issue/new-comics")

  return (
    <div className="divide-y-1 divide-list-line rounded bg-container-outer py-4 px-5 text-white">
      <div className="flex items-center gap-2 border-b-2 border-list-line pb-2 text-sm text-white">
        <div>
          <Sparkle />
        </div>
        <div>New Comics</div>
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
            <div className="whitespace-nowrap text-white">${Number(price).toFixed(2)}</div>
          </div>
          <Chevron />
        </div>
      ))}
      <div></div>
    </div>
  )
}
