import useSWR from "swr"
import React from "react"
import { Link } from "react-router-dom"

import Gallery from "components/dashboard/Gallery"
import Issue from "components/common/Issue"

type RelatedIssuesData = { id: string; name: string; title_id: string; title_name: string }

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  const { data: relatedIssues } = useSWR<RelatedIssuesData[]>(
    `/api/issue/${issueId}/related/issues`
  )

  return (
    <Gallery title="Related Issues">
      {relatedIssues?.map(({ id, name, title_name }) => {
        console.log(id, name, title_name)

        return (
          <Link key={id} to={`/details/${id}`}>
            <Issue id={id} title={title_name} issue={name} />
          </Link>
        )
      })}
    </Gallery>
  )
}

export default RelatedIssues
