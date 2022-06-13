import { useParams } from "react-router-dom"
import useSWR from "swr"
import * as React from "react"
import RelatedIssues from "components/issue-details/RelatedIssues"
import PriceGraph from "components/issue-details/PriceGraph"
import ScatterGraph from "components/issue-details/ScatterGraph"
import { monthText } from "utils/dates"
import type { IssueFull } from "types/api"
import { API, Storage, Analytics, Auth } from "aws-amplify"
import { AmplifyS3Image } from "@aws-amplify/ui-react/legacy"
import IssueChips from "components/common/IssueChips"
import ManageWatchList from "components/watchlist/ManageWatchList"
import PriceTable from "components/issue-details/PriceTable"


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
    evt.target.src='/no-image.svg';
  }
  
  const issue_comment = issue.comment || '';
  const issue_img = issue.cpg_id || '';
  
  const watchListData = {
    'imageId': issue?.cpg_id,
    'issueId': issue?.id,
    'publisher': issue?.publisher,
    'name': issue?.title,
    'issue': issue?.issue,
  }
  return (
    <div className="grid w-full gap-5 px-12 py-10 rounded bg-container-outer text-common-text">
      <div className="grid grid-cols-2 w-full gap-5 grow">
        <div>
            <AmplifyS3Image
              key={issue?.id}
              handleOnError={imgError}
              className="object-contain w-full"
              imgKey={`issues/${issue_img.replace('/', '-')}`}
            />          
        </div>
        <div className="flex flex-col min-w-0 gap-5 grow">
          <div className="flex flex-row justify-between">
            <div className="text-xl font-bold">
              {issue?.title}
            </div>
            <div className='text-right w-12'>
              <ManageWatchList data = {watchListData}/>
            </div>
          </div>
          <div className="text-sm">{metadata?.join(" | ")}</div>
          <IssueChips issue_comment={issue_comment} age={issue.age} />
          <Details issue={issue} />    
          <div className="w-full rounded bg-container-inner">
            <div className="w-full text-center mt-2 text-md font-semibold">Price Analysis</div>
            <PriceTable id={issue?.id} /> 
            
          </div> 
        </div>
      </div>
      
      <span className="w-full heading mr-5 text-xl font-semibold">Pricing Details</span>
      <div className="grid grid-cols-2 w-full gap-5 grow">
        <Graphs id={issue?.id} />
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
        <div>Current Value: ${issue?.cover_price}</div>
      </div>
      {issue?.comment && (
        <div className="w-full px-5 py-4 text-sm rounded bg-container-inner">
          <div className="mb-5">
            <div className="font-semibold text-md text-center">Issue Details</div>
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
