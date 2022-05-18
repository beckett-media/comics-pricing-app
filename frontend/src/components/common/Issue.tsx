import { getIssueImage } from "utils/imagePath"

type IssueProps = {
  id: string
  issue: string
  title: string
  publisher?: string
}

export default function Issue({ id, issue, title, publisher }: IssueProps) {
  const full_issue_name = `${title} #${issue}`

  return (
    <div className="flex w-32 flex-col items-center space-y-3">
      <div className="h-40 w-32">
        <img
          className="h-full w-full object-contain"
          alt={full_issue_name}
          src={getIssueImage(id)}
        />
      </div>
      <p className="text-center text-xs">{full_issue_name}</p>
      {publisher && <p className="text-xs">{publisher}</p>}
    </div>
  )
}
