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
    <div className="w-32 flex flex-col items-center space-y-3">
      <div className="w-32 h-40">
        <img
          className="w-full h-full object-contain"
          alt={full_issue_name}
          src={getIssueImage(id)}
        />
      </div>
      <p className="text-xs text-center">{full_issue_name}</p>
      {publisher && <p className="text-xs">{publisher}</p>}
    </div>
  )
}
