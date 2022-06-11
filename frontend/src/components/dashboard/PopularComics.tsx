import useSWR from "swr"
import React from "react"
import GalleryScroll  from "./GalleryScroll"
import Issue from "components/common/Issue"
import type { IssueMinimal } from "types/api"
import { Auth, Analytics } from "aws-amplify"
import usePopularComics from "hooks/data/usePopularComics"

export default function PopularComics() {
  const { data: issues, isLoading, isError } = usePopularComics()

  if (!issues) {
    return <div>loading</div>
  }

  async function recordIssueView({ id, issue, title, publisher, img_id }: IssueMinimal) {

    Analytics.enable()
    Analytics.record({
      name: "viewIssue",
      attributes: {
        ViewIssueImageId: id,
        ViewIssueissue: issue,
        ViewIssuetitle: title,
        ViewIssuepublisher: publisher,
        userEmail: await Auth.currentAuthenticatedUser().then((user) => user.attributes.email),
      },
      immediate: true,
    })
    console.log({ id, issue, title, publisher })
    Analytics.disable()
  }

  return (

    <GalleryScroll title="Popular Comics">
      {issues.map(({ id, issue, title, publisher, img_id}) => (
        
        <Issue 
            id={id}
            itemId={id} 
            issue={issue} 
            title={title} 
            publisher={publisher} 
            img_id={img_id}
           />

      ))}
    </GalleryScroll >
  )
}
