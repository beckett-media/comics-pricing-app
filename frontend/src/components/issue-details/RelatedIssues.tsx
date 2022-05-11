import useSWR from "swr"
import React from "react"
import { getIssueImage } from "../../utils/imagePath"
import { Link } from "react-router-dom"

type RelatedIssuesData = { id: string; name: string; title_id: string; title_name: string }

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  const { data: relatedIssues } = useSWR<RelatedIssuesData[]>(
    `/api/issue/${issueId}/related/issues`
  )
  return (
    <div>
      <p className={"text-center"}>
        <b>Related Issues</b>
      </p>
      <div className={"flex flex-row"}>
        {relatedIssues?.map(({ id, name, title_name }) => (
          <Link key={id} to={`/details/${id}`}>
            <div className={"flex flex-col justify-center text-center m-5"}>
              <img alt="issue cover" src={getIssueImage(id)} />
              <span>#{name}</span>
              <span>{title_name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RelatedIssues
