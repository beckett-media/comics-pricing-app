import useSWR from "swr"
import { Link } from "react-router-dom"
import React from "react"
import Gallery from "./Gallery"
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

    <Gallery title="Popular Comics">
      {issues.map(({ id, issue, title, publisher, img_id}) => (
        <Link
          key={id}
          to={`/details/${id}`}
          // analytics event for tracking clicks on the issue card

          onClick={() => recordIssueView({ id, issue, title, publisher, img_id})}
          data-amplify-analytics-on="click"
          data-amplify-analytics-name="click"
          data-amplify-analytics-attrs={`IssueimageId_Pospular:${id},IssueTitle_Popular:${title},IssuePub_Polular:${publisher}`}
        >

          <Issue id={id} issue={issue} title={title} publisher={publisher} img_id={img_id} />
        </Link>
      ))}
    </Gallery>
  )
}
