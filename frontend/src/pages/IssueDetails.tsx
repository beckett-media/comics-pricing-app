import { useParams } from "react-router-dom"

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  return (
    <div>
      <h2>Details - {issueId}</h2>
    </div>
  )
}
