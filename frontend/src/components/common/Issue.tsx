import { getIssueImage } from "utils/imagePath"
import { Analytics, Auth } from "aws-amplify"
import * as React from "react"

type IssueProps = {
  id: string
  issue: string
  title: string
  publisher: string
}

export default function Issue({ id, issue, title, publisher }: IssueProps) {
  // function to record a view of an issue in analytics events by the user (if logged in) and to track the number of views of an issue

  const [currentUser, setCurrentUser] = React.useState<any>()

  async function recordIssueView({ id, issue, title, publisher }: IssueProps) {
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
          logingUser: currentUser?.attributes?.email,
        },
      })
      Analytics.disable()
    }
  }

  React.useEffect(() => {
    recordIssueView({ id, issue, title, publisher })
  }, [id])

  return (
    <div className="flex w-32 flex-col items-center">
      <div className="h-40 w-32">
        <img
          className="h-full w-full object-contain"
          alt={`${title} #${issue}`}
          src={getIssueImage(id)}
        />
      </div>
      <div className="pt-3 text-center text-xs font-semibold">{title}</div>
      <div className="text-xxs">Issue #{issue}</div>
      <div className="text-xxs">{publisher}</div>
    </div>
  )
}
