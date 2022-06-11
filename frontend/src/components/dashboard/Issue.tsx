import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import "./amplifyS3Image.css"

type IssueProps = {
  id: any
  issue: any
  title: any
  publisher: any
  img_id: any
}

export default function Issue({ id, issue, title, publisher, img_id }: IssueProps) {
  
  console.log('nq img id', img_id)
  return (
    <div className="flex flex-col items-center w-50 space-y-3 align-center">
      
      <div className="w-20 h-20">
        <AmplifyS3Image 
              imgProps={ {'style': {'objectFit':'contain', 'height':'100%', 'width':'100%'} }}  
              imgKey={`issues/${img_id}`} 
        />
      </div>
      
      <p className="text-xs text-center">{}</p>
      
    </div>
  )
}
