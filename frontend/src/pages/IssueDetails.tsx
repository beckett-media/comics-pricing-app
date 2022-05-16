import { useParams } from "react-router-dom"
import useSWR from "swr"

import RelatedIssues from "components/issue-details/RelatedIssues"
import { getIssueImage } from "utils/imagePath"

type IssueDetailsData = {
  id: string
  title_id: string
  publisher_id: string
  issue_name: string
  title_name: string
  publisher_name: string
}

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, error } = useSWR<IssueDetailsData>(`/api/issue/${issueId}`)

  if (error) {
    return <div>{error.toString()}</div>
  }

  if (!issue) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full flex flex-col space-y-10 p-10">
      <MainDetails issue={issue} />
      <RelatedIssues issueId={issue.id} />
    </div>
  )
}

function MainDetails({ issue }: { issue: IssueDetailsData }) {
  const full_issue_name = `${issue.title_name} #${issue.issue_name}`

  return (
    <div className="w-full flex flex-row space-x-10">
      <img className="w-1/2 max-w-md" alt={full_issue_name} src={getIssueImage(issue.id)} />
      <div className="grow flex flex-col space-y-5">
        <div className="text-3xl">{full_issue_name}</div>
        <div className="text-sm">
          {issue.publisher_name} | {issue.title_name} | 1997
        </div>
        <div className="w-full text-sm outline outline-1 p-2">
          Details: First appearance of Luke Skywalker, Darth Vader, Princess Leia, Obi-Wan Kenobi,
          C-3PO, and R2-D2
        </div>
        <Graph />
      </div>
    </div>
  )
}

function Graph() {
  return <div className="w-full h-80 outline outline-1">Price Graph</div>
}
