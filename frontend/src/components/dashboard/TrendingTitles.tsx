import useSWR from "swr"
import { Link } from "react-router-dom"

type Issue = {
  id: string
  title_name: string
  issue_name: string
}

export default function TrendingTitles() {
  const { data: issues } = useSWR<Issue[]>("/api/issue/trending")
  console.log(issues?.slice(0, 5))
  return (
    <div className="w-full">
      <div className="h-32 bg-stone-800">
        <div className="text-sm text-white">🔥 Trending Titles</div>
        <span className="text-xs text-white">
          {issues?.slice(0, 5).map(({ id, title_name, issue_name }) => (
            <div className="flex flex-row justify-between border-t">
              <p className="">
                {title_name} #{issue_name}
              </p>

              <Link key={id} to={`/details/${id}`}>
                <p> view prices ▻</p>
              </Link>
            </div>
          ))}
        </span>
      </div>
    </div>
  )
}
