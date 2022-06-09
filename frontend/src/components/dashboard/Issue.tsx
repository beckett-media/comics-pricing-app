import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import "./amplifyS3Image.css"

type IssueProps = {
  id: any
  issue: any
  title: any
  publisher: any
}

export default function Issue({ id, issue, title, publisher }: IssueProps) {
  return (
    <div className="align-center flex w-32 flex-col items-center space-y-3">
      {/* <div className="h-40 w-32 bg-slate-300"></div> */}
      <AmplifyS3Image className="amplify-s3-image" imgKey={`titles/${id}`} />
      <p className="text-center text-xs">{title}</p>
      <p className="text-xs">{publisher}</p>
    </div>
  )
}
