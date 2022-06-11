import useSWR from "swr"
import { Link } from "react-router-dom"

import { ReactComponent as Chevron } from "assets/chevron.svg"
import { ReactComponent as Sparkle } from "assets/sparkle.svg"

import useNewComics from "hooks/data/useNewComics"

export default function NewComics() {
  const { data: issues, isLoading, isError } = useNewComics();

  return (
    <div className="w-full">
      <div className="h-40 p-2 divide-y-2 rounded divide-list-line bg-container-outer">
        <div className="flex gap-2 p-2 text-sm text-white">
          <div className="pt-1">
            <Sparkle />
          </div>
          New Comics
        </div>
        <div className="text-xs text-white divide-y-2 divide-list-line">
          {issues?.map(({ id, issue, title, price }) => (
            <div className="flex flex-row justify-between p-2">
              <div className="w-7/12 truncate">
                {title} #{issue}
              </div>
              <Link key={id} to={`/details/'${id}'`}>
                <div className="flex flex-row">
                  ${Number?.parseFloat(price)?.toFixed(2)}
                  <div className="pt-1 pl-3">
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
