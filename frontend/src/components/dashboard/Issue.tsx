import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy"

type IssueProps = {
  id: any
  issue: any
  title: any
  publisher: any
}

export default function Issue({ id, issue, title, publisher }: IssueProps) {
  return (
    <div className="flex flex-col items-center w-32 space-y-3 align-center">
      {/* <div className="w-32 h-40 bg-slate-300"></div> */}
      <AmplifyS3Image className="amplify-s3-image" imgKey={`titles/${id}`} />
      <p className="text-xs text-center">{title}</p>
      <p className="text-xs">{publisher}</p>
    </div>
  )
}
