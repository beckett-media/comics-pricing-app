import { useParams } from "react-router-dom"
import useSWR from "swr"
import * as React from "react"
import RelatedIssues from "components/issue-details/RelatedIssues"
import PriceGraph from "components/issue-details/PriceGraph"
import ScatterGraph from "components/issue-details/ScatterGraph"
import { monthText } from "utils/dates"
import type { IssueFull } from "types/api"
import { API, Storage, Analytics, Auth, DataStore } from "aws-amplify"
import { WaitingListComics, RecentlyView, RecentlyViewMetaData } from "../models"
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import IssueChips from "components/common/IssueChips"
import ManageWatchList from "components/watchlist/ManageWatchList"
import { ModelInit } from "@aws-amplify/datastore"

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  // const { data: issue, isError, isLoading } = useIssueDetails(issueId);

  const [issue, setData] = React.useState<IssueFull>()
  const [error, setError] = React.useState<any>()

  const apiName = "comicsapi"
  const path = `/api/issue/'${issueId}'`

  React.useEffect(() => {
    const myInit = {}
    API.get(apiName, path, myInit)
      .then((response) => {
        // Add your code here
        setData(response)

        DataStore.save(
          new RecentlyView({
            imageId: "test",
            issueId: "test",
            publisher: "test",
            name: "test",
            issue: "test",
          })
        )
      })
      .catch((error) => {
        console.log(error.response)
        setError(error)
      })
  }, [issueId])

  if (error) {
    return <div>{error?.toString()}</div>
  }

  if (!issue) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col w-full px-24 py-10 space-y-10">
      <MainDetails issue={issue} />
      <RelatedIssues issueId={issue?.id} />
    </div>
  )
}

function MainDetails({ issue }: { issue: IssueFull }) {
  const metadata = [issue?.publisher, issue?.volume, `Issue #${issue?.issue}`].filter((m) =>
    Boolean(m)
  )
  function imgError(evt: any) {
    evt.target.src = "/Pow.svg"
  }

  const issue_comment = issue.comment || ""

  const watchListData = {
    imageId: issue?.cpg_id,
    publisher: issue?.publisher,
    name: issue?.title,
    issue: issue?.issue,
  }

  return (
    <div className="grid w-full grid-cols-2 gap-10 px-12 py-10 rounded bg-container-outer text-common-text">
      <AmplifyS3Image
        handleOnError={imgError}
        className="object-contain w-full"
        imgKey={`issues/${issue.cpg_id}`}
      />
      <div className="flex flex-col min-w-0 gap-5 grow">
        <div className="flex flex-row justify-between">
          <div className="text-xl font-bold">{issue?.title}</div>
          <div className="text-right w-12">
            <ManageWatchList data={watchListData} />
          </div>
        </div>

        <div className="text-sm">{metadata?.join(" | ")}</div>
        <IssueChips issue_comment={issue_comment} age={issue.age} />
        <Details issue={issue} />
        <Graphs id={issue?.cpg_id} />
      </div>
    </div>
  )
}

function Details({ issue }: { issue: IssueFull }) {
  return (
    <>
      <div className="flex flex-col w-full gap-2 text-sm">
        <div>
          Cover Date: {monthText(issue?.publication_month ?? -1)} {issue?.publication_year}
        </div>
        <div>Cover Price: ${issue?.cover_price}</div>
        <div>Current Value: ${issue?.current_price?.toFixed(2)}</div>
      </div>
      {issue?.comment && (
        <div className="w-full px-5 py-4 text-sm rounded bg-container-inner">
          <div className="mb-2">
            <span className="font-semibold">Issue Details</span>
          </div>
          <div>{issue?.comment}</div>
        </div>
      )}
    </>
  )
}

function Graphs({ id }: { id: string }) {
  return (
    <>
      <div className="w-full rounded h-72 bg-container-inner">
        <PriceGraph id={id} />
      </div>
      <div className="w-full rounded h-72 bg-container-inner">
        <ScatterGraph id={id} />
      </div>
    </>
  )
}
