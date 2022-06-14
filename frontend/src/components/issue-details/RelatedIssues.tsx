import useSWR from "swr"
import React from "react"
import { Link } from "react-router-dom"

import GalleryScroll from "components/dashboard/GalleryScroll"
import Gallery from "components/dashboard/Gallery"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"
import { API } from "aws-amplify"

const RelatedIssues: React.FC<{ issueId: string }> = ({ issueId }) => {
  // const { data: relatedIssues } = useSWR<IssueMinimal[]>(`/api/issue/${issueId}/related/issues`)
  const [relatedIssues, setData] = React.useState<IssueMinimal[]>()
  const [error, setError] = React.useState<any>()

  const apiName = "comicsapi"
  const path = `/api/issue/${issueId}/related/issues`
  const myInit = {
    // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
  }

  React.useEffect(() => {
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setData(response?.data?.rows)
      })
      .catch((error) => {
        console.log(error.response)
        setError(error)
      })
  }, [issueId])

  return (
    <GalleryScroll title="Related Issues" link=''>
      {relatedIssues?.map(({ id, issue, title, publisher, img_id }) => (
          <Issue id={id} itemId={id} issue={issue} title={title} publisher={publisher} img_id={img_id}/>
      ))}
    </GalleryScroll>
  )
}

export default RelatedIssues