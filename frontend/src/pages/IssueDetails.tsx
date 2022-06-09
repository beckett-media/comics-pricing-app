import { useParams } from "react-router-dom"
import useSWR from "swr"
import * as React from "react"
import RelatedIssues from "components/issue-details/RelatedIssues"
import PriceGraph from "components/issue-details/PriceGraph"
import ScatterGraph from "components/issue-details/ScatterGraph"
import { getIssueImage } from "utils/imagePath"
import { monthText } from "utils/dates"
import type { IssueFull } from "types/api"
import { API, Storage } from "aws-amplify"
import {  AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import useIssueDetails from "hooks/data/useIssueDetails"

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, isError, isLoading } = useIssueDetails(issueId);

  if (isError) {
    return <div>Error</div>
  }

  if (isLoading || !issue) {
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

  return (
    <div className="grid w-full grid-cols-2 gap-10 rounded bg-container-outer py-10 px-12 text-common-text">
      {/* <img
        className="w-full object-contain"
        alt={`${issue?.title} #${issue?.issue}`}
        src={getIssueImage(issue?.id)}
      /> */}
      <AmplifyS3Image imgKey={"publishers/001efa98-55ff-4dec-abd7-87c513f0d2f6"} />
      <div className="flex min-w-0 grow flex-col gap-5">
        <div className="text-xl font-bold">{issue?.title}</div>
        <div className="text-sm">{metadata?.join(" | ")}</div>
        <Chips issue={issue} />
        <Details issue={issue} />
        <Graphs id={issue?.id} />
      </div>
    </div>
  )
}

function Chips({ issue }: { issue: IssueFull }) {
  return (
    <div className="flex w-full gap-2 text-xs">
      <div className="rounded bg-key-issue py-1 px-2">Key Issue</div>
      <div className={`rounded bg-${issue?.age?.toLowerCase()}-age py-1 px-2`}>
        {issue?.age} Age
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
        <div className="w-full rounded bg-container-inner py-4 px-5 text-sm">
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
