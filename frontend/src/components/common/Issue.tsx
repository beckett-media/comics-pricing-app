import { getIssueImage } from "utils/imagePath"

type IssueProps = {
  id: string
  issue: string
  title: string
  publisher: string
}

export default function Issue({ id, issue, title, publisher }: IssueProps) {
  return (
    <div className="flex w-32 flex-col items-center">
      <div className="h-40 w-32">
        <img
          className="h-full w-full object-contain"
          alt={`${title} #${issue}`}
          src={getIssueImage(id)}
        />
      </div>
      <div className="whitespace-nowrap pt-3 text-center text-xs font-semibold">{title}</div>
      <div className="text-xxs">Issue #{issue}</div>
      <div className="text-xxs">{publisher}</div>
    </div>
  )
}
