import { getIssueImage } from "utils/imagePath"

type IssueProps = {
  id: string
  issue: string
  title: string
  publisher?: string
}

export default function Issue({ id, issue, title, publisher }: IssueProps) {
  return (
    <div className="w-32 flex flex-col items-center space-y-3">
      <div className="w-32 h-40">
        <img className="w-full h-full object-contain" src={getIssueImage(id)} />
      </div>
      <p className="text-xs text-center">
        {title} #{issue}
      </p>
      {publisher && <p className="text-xs">{publisher}</p>}
    </div>
  )
}
