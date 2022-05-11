import { useParams } from "react-router-dom"
import useSWR from "swr"
import { getIssueImage } from "../utils/imagePath"
import RelatedIssues from "../components/issue-details/RelatedIssues"
import React from "react"
import RelatedTitles from "../components/issue-details/RelatedTitles"

type IssueDetailsData = {
  imgUrl: string
  id: string
  title_id: string
  publisher_id: string
  issue_name: string
  title_name: string
  publisher_name: string
  raw_values?: number[]
  grader_values?: number[]
  update_at?: Date
}
export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, error } = useSWR<IssueDetailsData>(`/api/issue/${issueId}`)
  if (error) {
    return <div>{error.toString()}</div>
  } else if (issue) {
    const { id, issue_name, title_name, publisher_name, update_at } = issue
    return (
      <div className={"flex"}>
        <div className={"flex flex-col"}>
          <div className={"flex justify-around p-5"}>
            <div className={"flex flex-col py-3 m-5"}>
              <h2 className={"pb-3"}>
                #{issue_name} {title_name}
              </h2>
              <img alt="comic-title-page" src={getIssueImage(id)} />
            </div>
            <div className={"flex flex-wrap mx-5 mt-9"}>
              <Detail name={"Publisher"} value={publisher_name} />
              <Detail name={"Title"} value={title_name} />
              <Detail name={"Issue"} value={issue_name} />
              {update_at && <Detail name={"Updated"} value={issue_name} />}
            </div>
          </div>
          <RelatedIssues issueId={id} />
        </div>
        <RelatedTitles issueId={id} />
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

const Detail: React.FC<{ name: string; value: string }> = ({ name, value }) => {
  return (
    <div className={"m-3"}>
      <strong>{name}</strong>: <span>{value}</span>
    </div>
  )
}
