import { getIssueImage } from "utils/imagePath"
import { Analytics, Auth } from "aws-amplify"
import { Link } from "react-router-dom"
import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import * as React from "react"

type IssueProps = {
  id: string
  issue: string
  title: string
  publisher: string
  img_id: string
  itemId:string
}

export default function Issue({ id, issue, title, publisher, img_id, itemId}: IssueProps) {
  // function to record a view of an issue in analytics events by the user (if logged in) and to track the number of views of an issue

  const [currentUser, setCurrentUser] = React.useState<any>()

  async function recordIssueView({ id, issue, title, publisher, img_id , itemId}: IssueProps) {
    if (await Auth.currentAuthenticatedUser()) {
      setCurrentUser(await Auth.currentAuthenticatedUser())
      Analytics.enable()
      Analytics.record({
        name: "View Issue",
        attributes: {
          imageId: id,
          issue,
          title,
          publisher,
          img_id,
          logingUser: currentUser?.attributes?.email,
        },
      })
      Analytics.disable()
    }
  }

  React.useEffect(() => {
    recordIssueView({ id, issue, title, publisher, img_id, itemId })
  }, [id])
  
  function imgError(evt: any) {
    evt.target.remove();
  }

  return (
    
    <Link
          key={id}
          to={`/details/${id}`}
          // analytics event for tracking clicks on the issue card
          onClick={() => recordIssueView({ id, issue, title, publisher, img_id, itemId})}
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="click"
          data-amplify-analytics-attrs={`IssueimageId_Pospular:${id},IssueTitle_Popular:${title},IssuePub_Polular:${publisher}`}
        >
      <div className="flex flex-col items-center w-48 px-8">
        <div className="w-32 h-40">
          <AmplifyS3Image 
            handleOnError = { imgError }
            imgProps={ {'style': {'objectFit':'contain', 'height':'100%', 'width':'100%'} }}  
            imgKey={`issues/${img_id}`} 
          />
          {/* {<img
            className="object-contain w-full h-full"
            alt={`${title} #${issue}`}
            src={getIssueImage(id)}
          /> } */}
        </div>
        <div className="pt-3 text-xs font-semibold text-center">{title}</div>
        <div className="text-xxs">Issue #{issue}</div>
        <div className="text-xxs">{publisher}</div>
      </div>
    </Link>
  )
}