import useSWR from "swr"
import React from "react"
import { Link } from "react-router-dom"

import Gallery from "components/dashboard/Gallery"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  const { data: relatedIssues } = useSWR<IssueMinimal[]>(`/api/issue/${issueId}/related/issues`)

  return (
    <Gallery title="Related Issues">
      {relatedIssues?.map(({ id, issue, title, publisher }) => (
        <Link key={id} to={`/details/${id}`}>
          <Issue id={id} issue={issue} title={title} publisher={publisher} />
        </Link>
      ))}
    </Gallery>
  )
}

export default RelatedIssues
