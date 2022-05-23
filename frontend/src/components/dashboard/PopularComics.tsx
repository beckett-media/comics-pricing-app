import useSWR from "swr"
import { Link } from "react-router-dom"

import Gallery from "./Gallery"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"

export default function PopularComics() {
  const { data: issues } = useSWR<IssueMinimal[]>("/api/issue/popular")

  if (!issues) {
    return <div>loading</div>
  }

  return (
    <Gallery title="Popular Comics">
      {issues.map(({ id, issue, title, publisher }) => (
        <Link key={id} to={`/details/${id}`}>
          <Issue id={id} issue={issue} title={title} publisher={publisher} />
        </Link>
      ))}
    </Gallery>
  )
}
