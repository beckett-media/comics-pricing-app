import useSWR from "swr"
import { Link } from "react-router-dom"

type Issue = {
  id: string
  title_name: string
  issue_name: string
}

export default function TrendingTitles() {
  const { data: issues } = useSWR<Issue[]>("/api/issue/trending")
  return (
    <div className="w-full ">
      <div className="h-36 divide-y-2 divide-list-line overflow-scroll rounded bg-container-outer p-2">
        <div className="flex p-2 text-sm text-white">
          <img src={require("assets/TrendingIcon.svg").default} alt="" className="pr-2" />
          Trending Titles
        </div>
        <div className="divide-y-2 divide-list-line text-xs text-white">
          {issues?.slice(0, 5).map(({ id, title_name, issue_name }) => (
            <div className="flex flex-row justify-between p-2">
              {title_name} #{issue_name}
              <Link key={id} to={`/details/${id}`}>
                <div className="flex flex-row text-secondary-link-text">
                  View Prices
                  <img src={require("assets/AngleRight.svg").default} alt="" className="pl-3" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
