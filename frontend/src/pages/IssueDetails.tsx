import { useParams } from "react-router-dom"
import { AutoSizer } from "react-virtualized"
import useSWR from "swr"
import { Line } from "@nivo/line"

import RelatedIssues from "components/issue-details/RelatedIssues"
import { getIssueImage } from "utils/imagePath"

type IssueDetailsData = {
  id: string
  title_id: string
  publisher_id: string
  issue_name: string
  title_name: string
  publisher_name: string
  publication_month: number | null
  publication_year: number | null
}

export default function IssueDetails() {
  const { issueId } = useParams<{ issueId: string }>()
  const { data: issue, error } = useSWR<IssueDetailsData>(`/api/issue/${issueId}`)

  if (error) {
    return <div>{error.toString()}</div>
  }

  if (!issue) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full flex-col space-y-10 p-10">
      <MainDetails issue={issue} />
      <RelatedIssues issueId={issue.id} />
    </div>
  )
}

function MainDetails({ issue }: { issue: IssueDetailsData }) {
  const full_issue_name = `${issue.title_name} #${issue.issue_name}`
  const metadata = [issue.publisher_name, issue.title_name, issue.publication_year].filter(
    (m) => m !== null
  )

  return (
    <div className="flex w-full flex-row space-x-10 items-stretch">
      <img
        className="max-h-[60vh] object-contain"
        alt={full_issue_name}
        src={getIssueImage(issue.id)}
      />
      <div className="flex grow flex-col space-y-5">
        <div className="text-3xl">{full_issue_name}</div>
        <div className="text-sm">{metadata.join(" | ")}</div>
        <div className="w-full p-2 text-sm outline outline-1">
          Details: First appearance of Luke Skywalker, Darth Vader, Princess Leia, Obi-Wan Kenobi,
          C-3PO, and R2-D2
        </div>
        <Graphs id={issue.id} />
      </div>
    </div>
  )
}

function Graphs({ id }: { id: string }) {
  return (
    <div className="grow flex md:flex-row sm:flex-col gap-5 items-stretch">
      <div className="grow outline outline-1">
        <PriceGraph id={id} />
      </div>
      <div className="grow outline outline-1">Scatter Graph</div>
    </div>
  )
}

type Price = {
  date: string
  price: string
  grade: string
}

function PriceGraph({ id }: { id: string }) {
  const { data: prices } = useSWR<Price[]>(`/api/issue/${id}/prices`)

  if (!prices) {
    return <div>loading</div>
  }

  const data = [
    {
      id: "High Quality",
      data: prices.map(({ date, price }) => ({ x: date.slice(0, 10), y: price })),
    },
  ]

  console.log(data)

  return (
    <AutoSizer>
      {({ width, height }) => (
        <Line
          width={width}
          height={height}
          data={data}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "transportation",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "count",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
        />
      )}
    </AutoSizer>
  )
}
